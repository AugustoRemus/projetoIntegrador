import schedule from "node-schedule";
import fetch from "node-fetch";
import PDFPrinter from "pdfmake";
import fs, { createWriteStream } from "fs";
import { notificarUsuarios } from '../controllers/userController.js';
import db from '../database.js';

const apiJobs = [];

export async function encontrarRequestModelo(id) {
  return await db.oneOrNone(
    'SELECT requisicao.codigo, requisicao.datahora, api.nome, api.url_base, status.descricao FROM requisicao JOIN api ON api.codigo = requisicao.codigo_api JOIN status ON status.codigo = requisicao.codigo_status WHERE requisicao.codigo = $1;',
    [id]
  );
}

export async function listarRequestsModelo() {
  return await db.query(
    'SELECT requisicao.codigo, requisicao.datahora, api.nome, api.url_base, status.descricao FROM requisicao JOIN api ON api.codigo = requisicao.codigo_api JOIN status ON status.codigo = requisicao.codigo_status;'
  );
}

export async function cadastrarRequestModelo(novoRequest) {
  const dataAgora = new Date(Date.now()).toISOString();
  return await db.one('INSERT INTO requisicao (datahora, codigo_api, codigo_status) VALUES ($1, $2, $3) RETURNING *;', [
    dataAgora,
    novoRequest.codigo_api,
    novoRequest.codigo_status,
  ]);
}

export async function atualizarRequestModelo(id, valorAtualizado) {
  return await db.one('UPDATE requisicao SET codigo_api = $1, codigo_status = $2 WHERE codigo = $3 RETURNING *;', [
    valorAtualizado.codigo_api,
    valorAtualizado.codigo_status,
    id,
  ]);
}

export async function excluirRequestModelo(id) {
  return await db.none('DELETE FROM requisicao WHERE codigo = $1;', [id]);
}

export async function encontrarRequestApiModelo(idApi) {
  return await db.query(
    'SELECT requisicao.codigo, requisicao.datahora, api.nome, api.url_base, requisicao.codigo_status FROM requisicao JOIN api ON api.codigo = requisicao.codigo_api JOIN status ON status.codigo = requisicao.codigo_status WHERE api.codigo = $1;',
    [idApi]
  );
}

//realiza requisicoes automaticamente
export async function adicionaApiJob(id, intervalo) {
  const job = schedule.scheduleJob(`*/${intervalo} * * * *`, async () => {
    try {
      const resultado = await db.query(`SELECT url_base FROM api WHERE codigo  = $1`, [id]);
      const url = resultado[0].url_base;
      const response = await fetch(url);

      const codigo_api = id;
      const codigo_status = response.status;
      const novaRequest = {codigo_api, codigo_status};
      cadastrarRequestModelo(novaRequest);
      
      if(codigo_status >= 400 && codigo_status < 600){
        const usuarios = await db.query(`SELECT * FROM usuario WHERE sigla_grupo = 'BS'`);
        const api = await db.one(`SELECT * FROM api WHERE codigo = $1`, [id]);
        console.log(api);
        notificarUsuarios(api, usuarios);
      }
    } catch (erro) {
      console.error(erro.message);
    }
  });

  apiJobs[id] = job;
};

export async function iniciarJobs() {
  try {
    const resultado = await db.query(`SELECT codigo, freq_mon_min FROM api`);
    console.log('Resultado da consulta:', resultado);

    for(const api of resultado){
      adicionaApiJob(api.codigo, api.freq_mon_min);
    }
    console.log('Jobs criados para monitoramento das APIs.');
  } catch (erro) {
    console.error('Erro ao iniciar os jobs:', erro);
  }
};

export async function atualizaApiJob(id, novoIntervalo) {
  const jobAtual = apiJobs[id];
  if (jobAtual) {
    jobAtual.cancel();
  }

  const intervalo = novoIntervalo;

  adicionaApiJob(id, intervalo);
};

export async function buscaRequestRelatorio(id){
  try{
    return await db.query(`SELECT a.nome as nome, a.url_base as url, r.datahora as dthr, r.codigo_status as sts FROM requisicao r JOIN api a on r.codigo_api = a.codigo WHERE a.codigo = $1`, [id]);
  } catch(erro){
    console.log({"Erro ao realizar consulta": erro});
  }
};

export async function gerarRelatorioModelo(id){
  const requests = await buscaRequestRelatorio(id);

  const fonts = {
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvitca-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    }
  }
  const printer = new PDFPrinter(fonts);

  const body = [];

  for await (let r of requests){
    const rows = new Array();
    rows.push(r.nome);
    rows.push(r.url);
    const dh = r.dthr.toISOString();
    rows.push(dh);
    rows.push(r.sts);

    body.push(rows);
  };

  const dataAgora = new Date(Date.now()).toISOString();
  const docDefinitions = {
    defaultStyle: {font: "Helvetica"},
    content: [
      {
        columns: [
          {text: "Relatório de Requisições", style: "header"},
          {text: dataAgora + "\n\n", style: "header"}
        ]
      },
      {
        table: {
          body: [["API", "url base", "data e hora", "status retornado"], ...body]
        }
      }],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
      },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinitions);

  pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf"));

  const chunks = [];

  pdfDoc.on("data", (chunk) => {
    chunks.push(chunk);
  });

  pdfDoc.end();

  pdfDoc.on("end", () => {
    const resultado = Buffer.concat(chunks);
    return resultado;
  });
}



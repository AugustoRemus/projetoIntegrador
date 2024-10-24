//import express from "express";
const express = require('express');

const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.listen(3001, ()=> {console.log('servidor on')});


let usarios = [];
let apis = [];

/*//rotas do usuário
server.post('/login-usuario', (req, res) => {
    const {usuario, senha} = req.body;
    //autenticação
    if(user){
        res.status(200).json({
            acesso: 'autorizado',
            usuario: usuario,
            permissoes: user.permissoes,
            isAdmin: permissaoAdmin  
        })
    } else {
        res.status(401).json({
            acesso: 'negado',
            mensagem: 'Usuário ou senha inválidos'
        });
    }
})

//rotas da api
server.get('/api', (req, res) => {
    const apiDesejada = req.body;
    if(ativa){
        res.status(200).json({
            api: apiDesejada
        })
    } else {

    }
   
})

server.post('/api', (req, res) => {
    const novaApi = req.body;
    apis.push(novaApi);

    res.status(201).json({
        message: "API resgistrada com sucesso",
        api_id: novaApi.api_id
    });
})

//rota dos alerta
server.post('set-alerta', (req, res) => {
    const apiRecebida = req.body;
    res.status(200).json({
     message: "Alerta configurado comsucesso para a API" + req.body.api_id
    })
})*/

let apiOn = [];
let apiOff = []; 
let numApi = int(6);

server.listen(3001, ()=> {console.log('servidor on')});

server.get('/', (req, res)=> {
    res.send("<h1>pagina inicial</h1>");
});

server.post('/Ususario', (req, res) =>{
    res.send(`subimeter cliente`);
});

server.get('/Usuario', (req, res) =>{
    res.send('recebendo usuario');
});

server.put('/Usuario', (req, res) =>{
    res.send('substituindo usuario');
});

server.delete('/Usuario', (req, res) =>{
    res.send('deletando Usuario');
});

server.post('/Senha', (req, res) =>{

    res.send(`subimeter Senha`);
});

server.get('/Senha', (req, res) =>{
    res.send('recebendo Senha');
});

server.put('/Senha', (req, res) =>{
    res.send('substituindo Senha');
});

server.delete('/Senha', (req, res) =>{
    usarios
    res.send('deletando Senha');
});

server.post('/Api', (req, res) =>{
    res.send(`subimeter Api`);
});

server.get('/Api', (req, res) =>{
    for api in Apis{
        if (api == 200){
        apiOn.append(api)
        }
        else{
        apiOff.append(api)
        }
    }

    res.send('recebendo Api');
});

server.put('/Api', (req, res) =>{
    res.send('substituindo Api');
});

server.delete('/Api', (req, res) =>{
    res.send('deletando Api');
});

server.post('/Status', (req, res) =>{

    res.send(`subimeter Status`);
});

server.get('/Status', (req, res) =>{
    const status = req.json("coiso atual")
    //agora bota na pagina a foto
});

server.put('/Status', (req, res) =>{
    res.send('substituindo Status');
});

server.delete('/Status', (req, res) =>{
    res.send('deletando Status');
});

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, TextField, Button } from "@mui/material";

export default function ApiAdms() {
    const [listaApis, setListaApis] = useState([]);//lista api

    
    const [deleteId, setDeleteId] = useState("");//guarda o id pra deletar


    const [newAPI, setNewAPI] = useState({
        nome: "",
        descricao: "",
        url_base: "",
        freq_mon_min: "",
        //data_cadastro: "",              //se pa mudar os nomes
      
    });//dados da nova api



    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api"); //botar certo
            setListaApis(res.data);//lista d obj
        } catch (error) {
            console.error("Erro ao buscar dados das APIs:", error);
            setListaApis([]);//deu pau
        }
    };




    //cadastrando nova api
    const handleCreateAPI = async () => {

        const { nome, descricao, url_base, freq_mon_min } = newAPI;

        if (!nome || !descricao || !url_base || !freq_mon_min) {
            alert("Por favor, preencha todos os campos para cadastrar uma nova API.");
            return;
        }

        try {
            await axios.post("http://localhost:3000/api", newAPI); //botar certo
            alert("API cadastrada com sucesso!");
            setNewAPI({ nome: "", descricao: "",url_base: "", freq_mon_min: ""});//reseta e atualiza
          
        } catch (error) {
            console.error("Erro ao cadastrar API:", error);
            console.log(JSON.stringify(error))
            alert("Erro ao cadastrar API.");
        }
    };



    //deleta api
    const handleDelete = async () => {

        if (!deleteId) {
            alert("Por favor, insira o Id da API que deseja deletar.");
            return;
        }

        try {

            await axios.delete(`http://localhost:3000/api/${deleteId}`); 
            alert("API deletada com sucesso!");
            setDeleteId(""); //reseta
          
        } catch (error) {
            console.error("Erro ao deletar API:", error);
            alert("Erro ao deletar API.");
        }
    };





    return (
        <Box
            sx={{
                width: '85vw',
                height: '90vh',

                position: 'fixed',
                top: '10vh',
                left: '10vw',
                border: '4px solid black',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                paddingLeft: '2.5vw',
                paddingRight: '3vw'
            }}
        >
 



     




            <h2>Cadastrar nova API</h2>
            <Stack spacing={2} sx={{ width: "100%" }}>
                <TextField
                    label="Nome API"//pega o nome
                    value={newAPI.nome}
                    onChange={(e) => setNewAPI({ ...newAPI, nome: e.target.value })}
                />


                    <TextField
                    label="Descrição"
                    value={newAPI.descricao}
                    onChange={(e) => setNewAPI({ ...newAPI, descricao: e.target.value })}
                />

            <TextField
                    label="URL Base"
                    value={newAPI.url_base}
                    onChange={(e) => setNewAPI({ ...newAPI, url_base: e.target.value })}
                />

                <TextField
                    label="Frequencia de Monitoramento"
                    value={newAPI.freq_mon_min}
                    onChange={(e) => setNewAPI({ ...newAPI, freq_mon_min: e.target.value })}
                />

                

                <Button variant="contained" color="primary" onClick={handleCreateAPI}>
                    Cadastrar API
                </Button>
            </Stack>

            <h1></h1>


            <h2>Deletar API por ID</h2>
            <Stack direction="row" spacing={2} sx={{ mb: 3, width: "100%" }}>
                <TextField
                    label="ID da API para Deletar"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    fullWidth
                />
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Deletar
                </Button>
            </Stack>

        </Box>
    );
}

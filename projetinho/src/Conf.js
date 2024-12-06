import React, { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Conf({ setLogado, setTelaAtiva }) {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        numero: "",
    });

    const [formLogin, setFormLogin] = useState({
        usuario: "",
        senha: "",
    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        if (formLogin.hasOwnProperty(name)) {
            setFormLogin((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };



    const handleSaveDados = async () => {
        try {
            await axios.post("localhost:3000/lugaprasalvar", formData);
            alert("Dados salvos com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
            alert("Erro ao salvar os dados.");
        }
    };

    const handleSaveLogin = async () => {
        
        handleDeslogar();  //por enqianto trocar quando rotas prontas
        /*
        try {
            await axios.post("localhost:3000/lugarprasalvarlogin", formLogin);//pesquisar
            alert("Dados de login salvos com sucesso. Por favor, relogue.");
            handleDeslogar();
        } catch (error) {
            console.error("Erro ao salvar dados de login:", error);
            alert("Erro ao salvar os dados de login.");
        }
            */
    };




    const handleDeslogar = () => {
        setLogado(false);
        setTelaAtiva("login");
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
                padding: '2.5vw 3vw',
            }}
        >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: '50ch',
                }}
                noValidate
                autoComplete="off"
            >
                <h1>Configurações do Usuário</h1>


                <TextField
                    id="nome"
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    variant="standard"
                />

                <TextField
                    id="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="standard"
                />

                <TextField
                    id="numero"
                    label="Número"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    variant="standard"
                    type="number"
                />

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={handleSaveDados}
                >
                    Salvar Dados
                </Button>


                <h1>Configurações de Login</h1>
                <TextField
                    id="usuario"
                    label="Novo nome de Usuário"
                    name="usuario"
                    value={formLogin.usuario}
                    onChange={handleChange}
                    variant="standard"
                />

                <TextField
                    id="senha"
                    label="Nova senha"
                    name="senha"
                    value={formLogin.senha}
                    onChange={handleChange}
                    variant="standard"
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={handleSaveLogin}
                >
                    Salvar Login
                </Button>
            </Box>

           
        </Box>
    );
}

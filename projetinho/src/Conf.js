import React, { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Conf() {
    //salva
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        numero: "",
        status: "",
        usuario: "",
        senha: "",
    });

    //atualiza quando escreve
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //manda pro back
    const handleSave = async () => {
        try {
            const response = await axios.post("http://localhost:3000", formData);
            alert("Dados salvos com sucesso!");
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
            alert("Erro ao salvar os dados.");
        }
    };



    return (
        <Box
            sx={{
                width: '85vw',
                height: '90vh',
                //margin: 'auto',
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
                
                <h1>Configurações de Login</h1>

                <TextField
                    id="usuario"
                    label="Novo nome de Usuário"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    variant="standard"
                />

                <TextField
                    id="senha"
                    label="Nova senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    variant="standard"
                />





            </Box>
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handleSave}
            >
                Salvar
            </Button>
        </Box>
    );
}

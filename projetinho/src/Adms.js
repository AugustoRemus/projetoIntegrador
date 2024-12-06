import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Stack } from "@mui/material";

export default function Adms() {
    const [listaUsuarios, setListaUsuarios] = useState([]); //lista dos usuario


    const [deleteId, setDeleteId] = useState(""); //guarda o id pra deletar


    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        permission: "",
    }); //dados dos novos usuarios

    



    //deleta usuario
    const handleDelete = async () => {
        if (!deleteId) {
            alert("Por favor, insira o ID do usuário para deletar.");
            return;
        }

        try {
            await axios.delete(`/users/${deleteId}`); //trocar
            alert("Usuário deletado com sucesso!");
            setDeleteId(""); //reseta
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            alert("Erro ao deletar usuário.");
        }
    };

    //criar novo
    const handleCreateUser = async () => {
        const { username, password, permission } = newUser;

        if (!username || !password || !permission) {
            alert("Por favor, preencha todos os campos para criar um usuário.");
            return;
        }

        try {
            await axios.post("/users", newUser); //botar certo
            alert("Usuário criado com sucesso!");
            setNewUser({ username: "", password: "", permission: "" });//reseta e atualiza
         
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            alert("Erro ao criar usuário.");
        }
    };







    return (
        <Box
            sx={{ width: '85vw',
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



            

            <h2>Deletar Usuário por ID</h2>
            <Stack direction="row" spacing={2} sx={{ mb: 3, width: "100%" }}>
                <TextField
                    label="ID do Usuário para Deletar"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    fullWidth
                />
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Deletar
                </Button>
            </Stack>




            <h2>Criar Novo Usuário</h2>
            <Stack spacing={2} sx={{ width: "100%" }}>
                <TextField
                    label="Usuário"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
                <TextField
                    label="Senha"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <TextField
                    label="Permissão"
                    value={newUser.permission}
                    onChange={(e) => setNewUser({ ...newUser, permission: e.target.value })}
                />
                <Button variant="contained" color="primary" onClick={handleCreateUser}>
                    Criar Usuário
                </Button>
            </Stack>
        </Box>
    );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Stack } from "@mui/material";

export default function ListaUsuarios() {
    const [listaUsuarios, setListaUsuarios] = useState([]); //lista dos usuario


    //requisicao
    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const res = await axios.get("/users"); //botar o certo
            setListaUsuarios(res.data);
        } catch (error) {
            console.error("Erro ao buscar dados dos usuários:", error);
            setListaUsuarios([]);
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


            <h2>Usuários Cadastrados</h2>
            <TableContainer component={Paper} sx={{ width: "100%", mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>Nome</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Permissão</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaUsuarios.length > 0 ? (
                            listaUsuarios.map((usuario) => (
                                <TableRow key={usuario.id}>
                                    <TableCell>{usuario.id}</TableCell>
                                    <TableCell>{usuario.nome}</TableCell>
                                    <TableCell>{usuario.email}</TableCell>
                                    <TableCell>{usuario.permissao}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Nenhum usuário disponível ou carregando dados...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        
        </Box>
    );
}

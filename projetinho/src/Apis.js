import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function Apis() {
    const [listaApis, setListaApis] = useState([]);

    //pega os dados
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("/apis"); //botar certo
            setListaApis(res.data); //lista d obj
        } catch (error) {
            console.error("Erro ao buscar dados das APIs:", error);
            setListaApis([]); //deu pau
        }
    };

    return (
        <Box
            sx={{
                width: '70vw',
                height: '75vh',
                margin: 'auto',
                position: 'fixed',
                top: '18vh',
                left: '20vw',
                border: '4px solid black',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: 2,
            }}
        >
            <h1>Exibição de APIs</h1>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>Nome</b></TableCell>
                            <TableCell><b>Status Atual</b></TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaApis.length > 0 ? (
                            listaApis.map((api) => (
                                <TableRow key={api.id}>
                                    <TableCell>{api.id}</TableCell>
                                    <TableCell>{api.nome}</TableCell>
                                    <TableCell>{api.status}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    Nenhuma API disponível ou carregando dados...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

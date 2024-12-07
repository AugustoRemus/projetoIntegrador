import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function Apis() {
    const [listaApis, setListaApis] = useState([]);
    const [statusMap, setStatusMap] = useState({});

    useEffect(() => {
        fetchAllData();
    }, []);

    
    const fetchAllData = async () => {
        try {
            const resApis = await axios.get("http://localhost:3000/api");
            setListaApis(resApis.data);
        } catch (error) {
            setListaApis([]);
        }
    };


    //pega o status da api passada
    const fetchStatus = async (codigo) => {
        try {
            const resStatus = await axios.get(`http://localhost:3000/api/status/${codigo}`);
            setStatusMap(prevStatus => ({ ...prevStatus, [codigo]: resStatus.data.descricao }));
        } catch (error) {}
    };

    useEffect(() => {
        listaApis.forEach((api) => {
            fetchStatus(api.codigo);
        });
    }, [listaApis]);

    return (
        <Box
            sx={{
                width: "85vw",
                height: "90vh",
                position: "fixed",
                top: "10vh",
                left: "10vw",
                border: "4px solid black",
                backgroundColor: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                paddingLeft: "2.5vw",
                paddingRight: "3vw",

            }}
        >
            <h1>Exibição de APIs</h1>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>ID</b>
                            </TableCell>
                            <TableCell>
                                <b>Nome</b>
                            </TableCell>
                            <TableCell>
                                <b>Status</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaApis.length > 0 ? (
                            listaApis.map((api) => (
                                <TableRow key={api.codigo}>
                                    <TableCell>{api.codigo}</TableCell>
                                    <TableCell>{api.nome}</TableCell>
                                    <TableCell>

                                        {statusMap[api.codigo] || "n encontrado"//pega o status q veio do get ou mostra n encontrado
                                        }
                                    </TableCell>
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

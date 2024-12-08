import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Apis() {
  const [carregou, setCarregou] = useState(false);
  const [listaApis, setListaApis] = useState(null);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const resApis = await axios.get('http://localhost:3005/api');
      setCarregou(true);
      setListaApis(resApis.data);

      resApis.data.forEach((api) => fetchStatus(api.codigo));
    } catch (error) {
      setCarregou(true);
      setListaApis(null);
    }
  };

  //pega o status da api passada
  const fetchStatus = async (codigo) => {
    try {
      const resStatus = await axios.get(`http://localhost:3005/api/status/${codigo}`);
      console.log(resStatus);
      setStatusMap((prev) => ({ ...prev, [codigo]: resStatus.data.status }));
    } catch (error) {
      console.error(error);
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
        paddingRight: '3vw',
      }}
    >
      <h1>Exibição de APIs</h1>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
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
            {!listaApis && !carregou ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Carregando dados...
                </TableCell>
              </TableRow>
            ) : !listaApis && carregou ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Ocorreu um erro ao carregar os dados
                </TableCell>
              </TableRow>
            ) : listaApis && listaApis.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Nenhuma API disponível...
                </TableCell>
              </TableRow>
            ) : (
              listaApis.map((api) => (
                <TableRow key={api.codigo}>
                  <TableCell>{api.codigo}</TableCell>
                  <TableCell>{api.nome}</TableCell>
                  <TableCell>
                    {
                      statusMap[api.codigo] || 'Carregando...' //pega o status q veio do get ou mostra n encontrado
                    }
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

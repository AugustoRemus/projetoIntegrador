import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function ListaUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState(null);
  const [carregou, setCarregou] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3005/user');
      setListaUsuarios(res.data);
      setCarregou(true);
    } catch (error) {
      console.error('Erro ao buscar dados dos usuários:', error);
      setCarregou(true);
      setListaUsuarios(null);
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
        //backgroundColor: '#f5f5f5',
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        paddingLeft: '2.5vw',
        paddingRight: '3vw',
        fontSize: '2rem'
        
      }}
    >
      <h2>Usuários Cadastrados</h2>
      <TableContainer component={Paper} sx={{ width: '100%', mb: 3 , }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#d3d3d3' }}>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell>
                <b>Nome</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Telefone</b>
              </TableCell>
              <TableCell>
                <b>Login</b>
              </TableCell>
              <TableCell>
                <b>Permissão</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!listaUsuarios && !carregou ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Carregando lista de usuários...
                </TableCell>
              </TableRow>
            ) : !listaUsuarios && carregou ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Ocorreu um erro ao carregar a lista de usuários!
                </TableCell>
              </TableRow>
            ) : listaUsuarios && listaUsuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Nenhum usuário disponível...
                </TableCell>
              </TableRow >
            ) : (
              listaUsuarios.map((usuario, index) => (
                <TableRow key={usuario.codigo} sx={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                }}>
                  <TableCell>{usuario.codigo}</TableCell>
                  <TableCell>{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.telefone}</TableCell>
                  <TableCell>{usuario.login}</TableCell>
                  <TableCell>{usuario.sigla_grupo}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

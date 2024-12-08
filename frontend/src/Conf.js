import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert, Snackbar, TableCell, TableRow } from '@mui/material';

export default function Conf({ setLogado, setTelaAtiva }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [login, setLogin] = useState('');

  const [carregou, setCarregou] = useState(false);
  const [dados, setDados] = useState(null);

  const [openMessage, setOpenMessage] = React.useState(false);
  const [messageText, setMessageText] = React.useState('');
  const [messageSeverity, setMessageSeverity] = React.useState('success');

  const [codigo, setCodigo] = useState(localStorage.getItem('codigo'));
  const [cargo, setCargo] = useState(localStorage.getItem('cargo'));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resultado = await axios.get(`http://localhost:3005/user/${codigo}`);
      setNome(resultado.data.nome);
      setEmail(resultado.data.email);
      setTelefone(resultado.data.telefone);
      setLogin(resultado.data.login);

      setDados(resultado.data);
      setCarregou(true);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      setCarregou(true);
      setDados(null);
      setMessageSeverity('error');
      setMessageText('Erro ao buscar dados do usuário.');
      setOpenMessage(true);
    }
  };

  const handleSaveLogin = async () => {
    try {
      await axios.put(`http://localhost:3005/user/senha/${codigo}`, { senha });
      setMessageSeverity('success');
      setMessageText('Senha salva com sucesso!');
      setOpenMessage(true);
    } catch (error) {
      console.error('Erro ao salvar senha:', error);
      setMessageSeverity('error');
      setMessageText('Erro ao salvar senha.');
      setOpenMessage(true);
    }
  };

  const handleSaveDados = async () => {
    try {
      const body = {
        sigla_grupo: cargo,
        nome,
        email,
        telefone,
        login,
      };
      await axios.put(`http://localhost:3005/user/${codigo}`, body);
      setMessageSeverity('success');
      setMessageText('Dados salvos com sucesso!');
      setOpenMessage(true);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      setMessageSeverity('error');
      setMessageText('Erro ao salvar dados.');
      setOpenMessage(true);
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

        {!dados && !carregou ? (
          <TableRow>
            <TableCell colSpan={4} align="center">
              Carregando...
            </TableCell>
          </TableRow>
        ) : !dados && carregou ? (
          <TableRow>
            <TableCell colSpan={4} align="center">
              Ocorreu um erro ao carregar os dados...
            </TableCell>
          </TableRow>
        ) : (
          <>
            <TextField
              id="nome"
              label="Nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              variant="standard"
            />

            <TextField
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
            />

            <TextField
              id="numero"
              label="Número"
              name="numero"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              variant="standard"
              type="text"
            />

            <TextField
              id="usuario"
              label="Novo nome de Usuário"
              name="usuario"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              variant="standard"
            />
          </>
        )}

        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSaveDados}>
          Salvar Dados
        </Button>

        <h1>Segurança</h1>
        <TextField
          id="senha"
          label="Nova senha"
          name="senha"
          value={senha}
          type="password"
          onChange={(e) => setSenha(e.target.value)}
          variant="standard"
        />
        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSaveLogin} disabled={senha === ''}>
          Salvar login
        </Button>

        <Snackbar open={openMessage} autoHideDuration={6000} onClose={() => setOpenMessage(false)}>
          <Alert severity={messageSeverity}>{messageText}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

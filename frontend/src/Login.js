import React from 'react';
import axios from 'axios';
import { Alert, Box, Button, Snackbar, Stack, TextField } from '@mui/material';

//ta recebendo diretamente os coisos
export default function Login({ setLogado, setIsAdmin, setTelaAtiva, setToken, setCodigo, codigo, setCargo }) {
  const [login, setUserLogin] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [openMessage, setOpenMessage] = React.useState(false);
  const [messageText, setMessageText] = React.useState('');
  const [messageSeverity, setMessageSeverity] = React.useState('success');

  //get tem q ver as permicao
  async function enviaLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/login', {
        login: login,
        senha: senha,
      });

      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('cargo', response.data.cargo);
        localStorage.setItem('codigo', response.data.codigo);
        setCodigo(response.data.codigo);
        setToken(response.data.token);
        setIsAdmin(response.data.cargo === 'ADM');
        setCargo(response.data.cargo);
        setLogado(true);
        setTelaAtiva('apis');
      } else {
        setOpenMessage(true);
        setMessageText('Falha ao logar usuário!');
        setMessageSeverity('error');
      }
    } catch (error) {
      console.log(error);
      setOpenMessage(true);
      setMessageText('Falha ao logar usuário!');
      setMessageSeverity('error');
    }
  }


  return (
    <Box
      sx={{
        width: '90vw',
        height: '90vh',
        margin: 'auto',
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
      }}
    >
      <h1>Tela de Login</h1>
      <Stack spacing={2} sx={{ width: '60%' }}>
        <TextField required label="Usuário" value={login} onChange={(event) => setUserLogin(event.target.value)} />

        <TextField
          required
          label="Senha"
          type="password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />

        <Stack direction="row" spacing={3} justifyContent="center">
          <Button variant="contained" color="primary" disabled={login === '' && senha === ''} onClick={enviaLogin}>
            Enviar
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={login === '' && senha === ''}
            onClick={() => {
              setSenha('');
              setUserLogin('');
            }}
          >
            Limpar
          </Button>
        </Stack>

        
      </Stack>
      <Snackbar open={openMessage} autoHideDuration={6000} onClose={() => setOpenMessage(false)}>
        <Alert severity={messageSeverity}>{messageText}</Alert>
      </Snackbar>
    </Box>
  );
}

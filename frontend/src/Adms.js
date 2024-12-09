import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Stack, Select, MenuItem, Snackbar, Alert } from '@mui/material';

export default function Adms(setTelaAtiva) {
  const [deleteId, setDeleteId] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [newUser, setNewUser] = useState({
    nome: '',
    email: '',
    telefone: '',
    login: '',
    senha: '',
    sigla_grupo: '',
  });

  const [openMessage, setOpenMessage] = React.useState(false);
  const [messageText, setMessageText] = React.useState('');
  const [messageSeverity, setMessageSeverity] = React.useState('success');

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const res = await axios.get('http://localhost:3005/cargo');
      setPermissions(res.data);
      //setOpenMessage(true);
      //setMessageText('Permissões carregadas com sucesso.');
      setMessageSeverity('success');
    } catch (error) {
      console.error('Erro ao buscar permissões:', error);
      setPermissions([]);
      openMessage(true);
      setMessageText('Erro ao buscar permissões.');
      setMessageSeverity('error');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) {
      setMessageSeverity('error');
      setMessageText('Por favor, preencha o ID do usuário para deletar.');
      setOpenMessage(true);
      return;
    }

    try {
      await axios.delete(`http://localhost:3005/user/${deleteId}`);
      setDeleteId('');
      setMessageSeverity('success');
      setMessageText('Usuário deletado com sucesso!');
      setOpenMessage(true);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      setMessageSeverity('error');
      setMessageText('Erro ao deletar usuário.');
      setOpenMessage(true);
    }
  };

  const handleCreateUser = async () => {
    const { login, senha, sigla_grupo } = newUser;

    if (!login || !senha || !sigla_grupo) {
      setMessageSeverity('error');
      setMessageText('Por favor, preencha todos os campos.');
      setOpenMessage(true);
      return;
    }

    try {
      await axios.post('http://localhost:3005/user', newUser);
      setMessageSeverity('success');
      setMessageText('Usuário criado com sucesso!');
      setOpenMessage(true);

      setNewUser({
        nome: '',
        email: '',
        telefone: '',
        login: '',
        senha: '',
        permission: '',
        sigla_grupo: '',
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setMessageSeverity('error');
      setMessageText('Erro ao criar usuário.');
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
        backgroundColor: '#fafafa',
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
      <h2>Deletar Usuário por ID</h2>
      <Stack direction="row" spacing={2} sx={{ mb: 3, width: '100%' }}>
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
      <Stack spacing={2} sx={{ width: '100%' }}>
        <TextField
          label="Nome"
          value={newUser.nome}
          onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
        />
        <TextField
          label="E-mail"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <TextField
          label="Telefone"
          value={newUser.telefone}
          onChange={(e) => setNewUser({ ...newUser, telefone: e.target.value })}
        />
        <TextField
          label="Usuário"
          value={newUser.login}
          onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
        />
        <TextField
          label="Senha"
          type="password"
          value={newUser.senha}
          onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
        />
        <Select
          value={newUser.sigla_grupo}
          onChange={(e) => setNewUser({ ...newUser, sigla_grupo: e.target.value })}
          displayEmpty
        >
          <MenuItem value={''} disabled>
            Selecione uma permissão
          </MenuItem>
          {permissions.map((perm) => (
            <MenuItem key={perm.sigla} value={perm.sigla}>
              {perm.sigla}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={handleCreateUser}>
          Criar Usuário
        </Button>
      </Stack>

      <Snackbar open={openMessage} autoHideDuration={6000} onClose={() => setOpenMessage(false)}>
        <Alert severity={messageSeverity}>{messageText}</Alert>
      </Snackbar>
    </Box>
  );
}

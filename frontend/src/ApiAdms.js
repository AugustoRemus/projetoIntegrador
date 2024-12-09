import React, { useState } from 'react';
import axios from 'axios';
import { Box, Stack, TextField, Button, Snackbar, Alert } from '@mui/material';

export default function ApiAdms(setTelaAtiva) {
  const [deleteId, setDeleteId] = useState(''); //guarda o id pra deletar
  const [openMessage, setOpenMessage] = React.useState(false);
  const [messageText, setMessageText] = React.useState('');
  const [messageSeverity, setMessageSeverity] = React.useState('success');

  const [newAPI, setNewAPI] = useState({
    nome: '',
    descricao: '',
    url_base: '',
    freq_mon_min: '',
  });

  const handleCreateAPI = async () => {
    const { nome, descricao, url_base, freq_mon_min } = newAPI;

    if (!nome || !descricao || !url_base || !freq_mon_min) {
      setMessageSeverity('error');
      setMessageText('Por favor, preencha todos os campos.');
      setOpenMessage(true);
      return;
    }
    

    try {
      await axios.post('http://localhost:3005/api', newAPI);
      setNewAPI({ nome: '', descricao: '', url_base: '', freq_mon_min: '' });
      setMessageText('API cadastrada com sucesso!');
      setOpenMessage(true);
      setMessageSeverity('success');
    } catch (error) {
      console.error('Erro ao cadastrar API:', error);
      console.log(JSON.stringify(error));
      setMessageText('Erro ao cadastrar API.');
      setOpenMessage(true);
      setMessageSeverity('error');
    }
  };


  //deleta api
  const handleDelete = async () => {
    if (!deleteId) {
      alert('Por favor, insira o Id da API que deseja deletar.');
      return;
    }

    try {
      await axios.delete(`http://localhost:3005/api/${deleteId}`);
      setDeleteId(''); //reseta
      setMessageSeverity('success');
      setMessageText('API deletada com sucesso!');
      setOpenMessage(true);
    } catch (error) {
      console.error('Erro ao deletar API:', error);
      setMessageSeverity('error');
      setMessageText('Erro ao deletar API.');
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
      <h2>Cadastrar nova API</h2>
      <Stack spacing={2} sx={{ width: '70%' }}>
        <TextField
          label="Nome API" //pega o nome
          value={newAPI.nome}
          onChange={(e) => setNewAPI({ ...newAPI, nome: e.target.value })}
        />

        <TextField
          label="Descrição"
          value={newAPI.descricao}
          onChange={(e) => setNewAPI({ ...newAPI, descricao: e.target.value })}
        />

        <TextField
          label="URL Base"
          value={newAPI.url_base}
          onChange={(e) => setNewAPI({ ...newAPI, url_base: e.target.value })}
        />

        <TextField
          label="Frequencia de Monitoramento"
          value={newAPI.freq_mon_min}
          onChange={(e) => setNewAPI({ ...newAPI, freq_mon_min: e.target.value })}
        />


      <Box
        component="form"
        sx={{
          
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          width: '100%',
         // maxWidth: '50ch',
        }}
        noValidate
        autoComplete="off"
      >
       
        <Button variant="contained" color="primary" onClick={handleCreateAPI}>
          Cadastrar API
        </Button>



        <Button 
            variant="outlined"
            color="error"
           
            onClick={() => {
             
              
              setNewAPI({ nome: '',
                descricao: '',
                url_base: '',
                freq_mon_min: '',})
              
            }}
          >
            Limpar
          </Button>


          </Box>
       


      </Stack>

      <h2>Deletar API por ID</h2>
      <Stack direction="row" spacing={2} sx={{ mb: 3, width: '70%' }}>
        <TextField
          label="ID da API para Deletar"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="error" onClick={handleDelete}>
          Deletar
        </Button>
      </Stack>

      <Snackbar open={openMessage} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={6000} onClose={() => setOpenMessage(false)}>
        <Alert severity={messageSeverity}>{messageText}</Alert>
      </Snackbar>
    </Box>
  );
}

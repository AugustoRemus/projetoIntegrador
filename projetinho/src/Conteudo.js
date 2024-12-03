import React from 'react';
import Box from '@mui/material/Box';

function Conteudo() {
  return (
    <Box
      sx={{
        bgcolor: '#696969',
        position: 'fixed',
        width: '90vw',    
        height: '90vh',
        right:0,
        bottom: 0,

      }}
    >
      <h1>Meio</h1>
      <p>Fazemo aqui as paginas, esse é o fundo</p>
    </Box>
  );
}

export default Conteudo;
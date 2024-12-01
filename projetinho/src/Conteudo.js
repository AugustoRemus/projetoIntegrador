import React from 'react';
import Box from '@mui/material/Box';

function Conteudo() {
  return (
    <Box
      sx={{
        marginLeft: '200px', 
        marginTop: '100px', 
        padding: '16px',
        bgcolor: '#696969',
        position: 'fixed',
        top: 0, 
        left: 0, 
        right:0,
        bottom: 0,
        borderLeft: '4px solid black',
        borderTop: '4px solid black'

      }}
    >
      <h1>Meio</h1>
      <p>Fazemo aqui as paginas, esse é o fundo</p>
    </Box>
  );
}

export default Conteudo;
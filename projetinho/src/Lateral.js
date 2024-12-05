import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import Login from'./Login';

export default function Lateral() {
   
    const [selectedUm, setSelectedUm] = React.useState(false);
    const [selectedDois, setSelectedDois] = React.useState(false);
    const [selectedTres, setSelectedTres] = React.useState(false);

    //verifica
    const [logado, setLogado] = React.useState(false);


    const testeLogin = () => {
        if (!logado) {
            alert("Faça login para acessar outras funcionalidades");
        } else {
            alert("Logado!"); 
        }
    };

    //muda o estado
    const mudarPermi = () => {
        setLogado((prevLogado) => !prevLogado); 
    };

    return (
        <Box
            component="section"
            sx={{
                bgcolor: '#4a4a4a',
                width: '10vw',
                height: '90vh',
                boxShadow: 1,
                position: 'fixed',
                bottom: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                borderRight: '4px solid black',
            }}
        >
            <ToggleButton
                value="check"
                selected={selectedUm} 
                onChange={() => {
                    setSelectedUm((prevSelected) => !prevSelected);
                    mudarPermi(); 
                }}
                sx={{
                    height: '10vh',
                    boxShadow: 1,
                    border: '1px solid black',
                }}
            >
                um
            </ToggleButton>

            <ToggleButton
                value="check"
                selected={selectedDois} 
                onChange={() => {
                    setSelectedDois((prevSelected) => !prevSelected);
                    testeLogin(); 
                }}
                sx={{
                    height: '10vh',
                    boxShadow: 1,
                    border: '1px solid black',
                }}
            >
                dois
            </ToggleButton>

            <ToggleButton
                value="check"
                selected={selectedTres} 
                onChange={() => {
                    setSelectedTres((prevSelected) => !prevSelected);
                    testeLogin(); 
                }}
                sx={{
                    height: '10vh',
                    boxShadow: 1,
                    border: '1px solid black',
                }}
            >
                tres
            </ToggleButton>
            <Login />
        </Box>
        
    );
}

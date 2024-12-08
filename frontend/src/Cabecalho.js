import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

function Cabecalho() {
    const [horaAtual, setHoraAtual] = React.useState(new Date().toLocaleTimeString());

    //atualiza a hora
    React.useEffect(() => {
        const intervalo = setInterval(() => {
            setHoraAtual(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(intervalo); //reseta
    }, []);

    return (
        <div>
            <Box
                component="section"
                sx={{
                    bgcolor: '#343434', 
                    height: '10vh',
                    boxShadow: 1,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    borderBottom: '4px solid black',
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid size={2}>
                            Parte inicial logo da empresa ou status
                        </Grid>
                        <Grid size={8}>
                           
                        </Grid>
                        <Grid size={1}></Grid>
                        <Grid size={1}>
                            <Box
                                sx={{
                                    color: 'white', 
                                    fontSize: '2rem', 
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                {horaAtual}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}

export default Cabecalho;

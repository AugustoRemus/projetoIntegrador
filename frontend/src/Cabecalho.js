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
                    bgcolor: '#F0F0F0', 
                    height: '10vh',
                    boxShadow: 4,
                    position: 'fixed',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                    right: 0,
                    borderBottom: '4px solid black',
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={2}>
                           
                        <Box
                                sx={{
                                    color: 'black', 
                                    //backgroundColor: '#000000', 
                                    fontFamily: 'Roboto Mono, monospace', 
                                    fontSize: '3rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    height: '100%', 
                                    textAlign: 'center',
                                }}
                            >
                                Seth Total
                            </Box>

                        </Grid>
                        <Grid size={2} >
                        <Box
                                sx={{
                                    color: 'black', 
                                   
                                    fontFamily: 'Roboto Mono, monospace', 
                                    fontSize: '2rem',
                                 
                                   
                                }}
                            >
                                Monitor de APIs
                            </Box>
                           
                        </Grid>
                        <Grid size={6}>
                            
                        </Grid>
                       
                        <Grid size={2} sx={{height: '10vh',}}>
                            <Box
                                sx={{
                                    color: 'black', 
                                    //backgroundColor: '#000000', 
                                    fontFamily: 'Roboto Mono, monospace', 
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    height: '100%', 
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

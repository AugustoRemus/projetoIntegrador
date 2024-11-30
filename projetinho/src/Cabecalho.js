import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

function Cabecalho() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>
            <Box component="section" sx={{
                bgcolor: '#4d4d4d',
                height: 100,
                boxShadow: 1,
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right:0,
                borderBottom: '4px solid darkred'

            }}>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid size={2}>
                            Parte inicial
                        </Grid>
                        <Grid size={8}>
                            Meio
                        </Grid>
                        <Grid size={1}></Grid>
                        <Grid size={1}>
                            Parte Final
                        </Grid>
                    </Grid>
                </Box>
                
            </Box>



        </div>
    );
}

export default Cabecalho;


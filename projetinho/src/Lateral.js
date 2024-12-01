import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

function Lateral() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>
            <Box component="section"    sx={{
        bgcolor: '#343434',
        width: 200, 
        height: '100vh', 
        boxShadow: 1,
        position: 'fixed', 
        top: 0, 
        left: 0, 
    
      }}

            >

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        lateral
                    </Grid>
                </Box>
                
            </Box>



        </div>
    );
}

export default Lateral;


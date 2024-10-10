import React from "react";
import Button from '@mui/material/Button';

import ApiPlaceHolder from "./ApiPlaceHolder";

function Central() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>	
        <h1>Centro</h1>

     
        <Button variant="text">apis</Button>
        
        </div>
    );
    }

export default Central;


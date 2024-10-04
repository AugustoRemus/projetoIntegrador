import React from "react";

function Cabecalho() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>	
            <h1>Cabecalho lindo</h1>
        </div>
    );
    }

export default Cabecalho;


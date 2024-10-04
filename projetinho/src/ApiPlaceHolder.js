import React from "react";

function ApiPlaceHolder() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>	
        <h1>Apizinha</h1>
       
        </div>
    );
    }

export default ApiPlaceHolder;


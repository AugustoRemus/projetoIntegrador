import React from "react";

function Lateral() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>	
        <h1>Lateral no lado</h1>
        
        </div>
    );
    }

export default Lateral;


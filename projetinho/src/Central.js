import React from "react";

import ApiPlaceHolder from "./ApiPlaceHolder";

function Central() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>	
        <h1>Centro</h1>

        <ApiPlaceHolder/>
   
        </div>
    );
    }

export default Central;


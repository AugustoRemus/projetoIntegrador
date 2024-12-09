import React from "react";
import Lateral from "./Lateral";
import Cabecalho from './Cabecalho';



function App() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>	
            <Lateral />
            <Cabecalho />
 
        </div>
    );
    }

export default App;


import React from "react";
import Hello from "./Hello";
import Central from "./Central";
import Cabecalho from "./Cabecalho";
import Lateral from "./Lateral";



function App() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>	
        <Hello/>
        <Cabecalho/>
        <Lateral/>
        <Central/>
        </div>
    );
    }

export default App;


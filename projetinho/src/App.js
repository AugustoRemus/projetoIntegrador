import React from "react";
import Lateral from "./Lateral";



function App() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>	
            <Lateral />
 
        </div>
    );
    }

export default App;


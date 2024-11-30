import React from "react";
import Layout from "./Layout";




function App() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>	
        
        <Layout />
        </div>
    );
    }

export default App;


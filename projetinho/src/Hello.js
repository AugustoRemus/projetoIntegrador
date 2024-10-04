import React from "react";

function Hello() {
    const [nome, setNome] = React.useState("");

    const alterarNome = (event) => { setNome(event.target.value); }

    return (
        <div>	
        <h1>Hello World</h1>
        <form>
            <label>
                <input type="text" 
                placeholder="Name"  
                value={nome} 
                onChange={alterarNome}
                className="classeInput"
                />
            </label>
        </form>
        </div>
    );
    }

export default Hello;


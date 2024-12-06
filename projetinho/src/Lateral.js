import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import Login from './Login';
import Apis from './Apis';
import Conf from './Conf';
import Adms from './Adms';
import Cabecalho from "./Cabecalho"
import ApiAdms from './ApiAdms';
import ListaUsuarios from './ListaUsuarios';

export default function Lateral() {

    const [logado, setLogado] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false); 
    const [telaAtiva, setTelaAtiva] = React.useState('login'); //aqui fica a tela atual

    //as tela ficam  aqui
    const telas = {
        login: <Login />,
        apis: <Apis />,
        conf: <Conf />,
        adms: <Adms />,
        apiAdms: <ApiAdms />,
        usuarios: <ListaUsuarios />,
    };

    //login debug
    const mudarStatusLogin = () => {
        setLogado((prevLogado) => !prevLogado);
        if(!logado){
            setTelaAtiva('apis');//da pra usar em um botao d dar deslogin
        }
        else{
            setTelaAtiva('login');
        }
        
        alert(!logado ? 'Logado': 'Deslogado.');
    };

    const mudarPermissao = () =>{
        setIsAdmin((prevIsAdmin) => (!prevIsAdmin)); 
        alert(!isAdmin ? 'adm': 'normal');
    }

    
    const botoes = [
        { label: 'Login', tela: 'login', precisaLogin: false},
        { label: 'Apis', tela: 'apis', precisaLogin: true },
        { label: 'Admin APIs', tela: 'apiAdms', precisaLogin: true, precisaAdmin: true },
        { label: 'Conf', tela: 'conf', precisaLogin: true },
        { label: 'Usuarios', tela: 'usuarios', precisaLogin: true, precisaAdmin: true },
        { label: 'Administrar Usuarios', tela: 'adms', precisaLogin: true, precisaAdmin: true },
        { label: 'Logar/Deslogar', acao: mudarStatusLogin }, //debug login
        { label: 'Admin/ n Adminin', acao: mudarPermissao },//debug adm
    ];

    return (
        <Box
            component="section"
            sx={{
                bgcolor: '#4a4a4a',
                width: '10vw',
                height: '90vh',
                boxShadow: 1,
                position: 'fixed',
                bottom: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                borderRight: '4px solid black',
            }}
        >
            <Cabecalho />

           

           
            {botoes.map((botao, index) => {
                //olha se pode mostrar
                const podeExibir = !botao.precisaLogin || (logado && (!botao.precisaAdmin || isAdmin));

                if (!podeExibir) return null;//so carrega se o usuario pode ver

                return (
                    <ToggleButton
                        key={index}
                        value="check"
                        onChange={() => {
                            if (botao.acao) {
                                botao.acao();//faz algo caso tenha acao
                            } else {
                                setTelaAtiva(botao.tela);//escolhe a tela
                            }
                        }}
                        sx={{
                            height: '10vh',
                            boxShadow: 1,
                            border: '1px solid black',
                        }}
                    >
                        {botao.label}
                    </ToggleButton>
                );
            })}

            
            <Box
                sx={{
                    flex: 1,//tela ativad
                    bgcolor: '#fff',
                    width: '90vw',
                    marginLeft: '10vw',
                }}
            >
                {telas[telaAtiva]}
            </Box>
        </Box>
    );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import Login from './Login';
import Apis from './Apis';
import Conf from './Conf';
import Adms from './Adms';
import Cabecalho from "./Cabecalho";
import ApiAdms from './ApiAdms';
import ListaUsuarios from './ListaUsuarios';

export default function Lateral() {
    const [logado, setLogado] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [telaAtiva, setTelaAtiva] = React.useState('login');

    const handleDeslogar = () => {
        setLogado(false);
        setTelaAtiva('login');
    };

    const telas = {
        login: <Login setLogado={setLogado} setIsAdmin={setIsAdmin} setTelaAtiva={setTelaAtiva} />,
        apis: <Apis />,
        conf: <Conf setLogado={setLogado} setTelaAtiva={setTelaAtiva} />,
        adms: <Adms />,
        apiAdms: <ApiAdms />,
        usuarios: <ListaUsuarios />,
    };

    const botoes = [
        { label: 'Login', tela: 'login', precisaLogin: false, esconderSeLogado: true },
        { label: 'APIs', tela: 'apis', precisaLogin: true },
        { label: 'Administrar APIs', tela: 'apiAdms', precisaLogin: true, precisaAdmin: true },
        { label: 'Usuários', tela: 'usuarios', precisaLogin: true, precisaAdmin: true },
        { label: 'Administrar Usuários', tela: 'adms', precisaLogin: true, precisaAdmin: true },
        { label: 'Configurações', tela: 'conf', precisaLogin: true },
        { label: 'Sair', precisaLogin: true, acao: handleDeslogar },//acao faz acontecer as paradas, bom pra debug
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
                const podeExibir =
                    (!botao.precisaLogin || (logado && (!botao.precisaAdmin || isAdmin))) &&
                    !(botao.esconderSeLogado && logado);

                if (!podeExibir) return null;

                return (
                    <ToggleButton
                        key={index}
                        value="check"
                        onClick={() => {
                            if (botao.acao) {
                                botao.acao(); //executa acao do botao
                            } else {
                                setTelaAtiva(botao.tela); //troca a tela
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
                    flex: 1,
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

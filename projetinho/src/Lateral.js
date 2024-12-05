import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import Login from './Login';
import Apis from './Apis';
import Conf from './Conf';
import Adms from './Adms';

export default function Lateral() {

    const [logado, setLogado] = React.useState(false);
    const [telaAtiva, setTelaAtiva] = React.useState('login'); //tela atual

    //todas as telas ficam aqui
    const telas = {
        login: <Login />,
        apis: <Apis />,
        conf: <Conf />,
        adms: <Adms />
    };

    //login
    const verificarLogin = (novaTela) => {
        if (!logado) {
            alert('Logue para mais funcionalidades');
        } else {
            setTelaAtiva(novaTela);   //manda pra nova tela
        }
    };

    const mudarPermissao = () => {
        setLogado((prevLogado) => !prevLogado);
        alert(!logado ? 'logado' : 'deslogado.');   //somente para debug
    };

    //os botao e oq tem q ter pra acessar
    const botoes = [
        { label: 'Login', tela: 'login', precisaLogin: false },
        { label: 'Apis', tela: 'apis', precisaLogin: true },
        { label: 'Conf', tela: 'conf', precisaLogin: true },
        { label: 'Conf Admins', tela: 'adms', precisaLogin: true },
        { label: 'Logar/Deslogar', acao: mudarPermissao }, //debug so muda se ta logado ou n
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
            {botoes.map((botao, index) => (
                <ToggleButton
                    key={index}
                    value="check"
                    onChange={() => {
                        if (botao.acao) {
                            botao.acao(); //se tem acao
                        } else if (botao.precisaLogin) {
                            verificarLogin(botao.tela); //olha se tem q ter login
                        } else {
                            setTelaAtiva(botao.tela); //bota a tela do botao ativa
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
            ))}

            
            <Box
                sx={{
                    flex: 1,
                    bgcolor: '#fff',
                    width: '90vw',
                    marginLeft: '10vw',  //carrega a tela
                }}
            >
                {telas[telaAtiva]} 
            </Box>
        </Box>
    );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import Login from './Login';
import Apis from './Apis';
import Conf from './Conf';
import Adms from './Adms';
import ApiAdms from './ApiAdms';
import ListaUsuarios from './ListaUsuarios';
import { Button } from '@mui/material';
import foto from './imagem/Seth.png';

export default function Lateral() {
  const [logado, setLogado] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [telaAtiva, setTelaAtiva] = React.useState('login');
  const [token, setToken] = React.useState('');
  const [codigo, setCodigo] = React.useState('');
  const [cargo, setCargo] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAdmin(localStorage.getItem('cargo') === 'ADM');
      setCodigo(localStorage.getItem('codigo'));
      setCodigo(localStorage.getItem('codigo'));
      setCargo(localStorage.getItem('cargo'));
      setToken(token);
      setLogado(true);
      setTelaAtiva('apis');
    }
  }, []);

  const handleDeslogar = () => {
    setLogado(false);
    setToken('');
    setIsAdmin(false);
    setTelaAtiva('login');
    localStorage.removeItem('token');
  };

  

  const telas = {
    login: (
      <Login
        setLogado={setLogado}
        setIsAdmin={setIsAdmin}
        setTelaAtiva={setTelaAtiva}
        setToken={setToken}
        setCargo={setCargo}
        setCodigo={setCodigo}
      />
    ),
    apis: <Apis />,
    conf: <Conf setLogado={setLogado} setTelaAtiva={setTelaAtiva} />,
    adms: <Adms setTelaAtiva={setTelaAtiva} />,
    apiAdms: <ApiAdms setTelaAtiva={setTelaAtiva} />,
    usuarios: <ListaUsuarios />,
  };

  const botoes = [
    {
      label: 'Login',
      tela: 'login',
      precisaLogin: false,
      esconderSeLogado: true,
    },
    { label: 'APIs', tela: 'apis', precisaLogin: true },
    { label: 'Administrar APIs', tela: 'apiAdms', precisaLogin: true, precisaAdmin: true },
    { label: 'Usuários', tela: 'usuarios', precisaLogin: true, precisaAdmin: true },
    { label: 'Administrar Usuários', tela: 'adms', precisaLogin: true, precisaAdmin: true },
    { label: 'Configurações', tela: 'conf', precisaLogin: true, codigo: codigo },
    { label: 'Sair', precisaLogin: true, acao: handleDeslogar },
  ];

  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#F0F0F0',
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


      {botoes.map((botao, index) => {
        const podeExibir =
          (!botao.precisaLogin || (logado && (!botao.precisaAdmin || isAdmin))) && !(botao.esconderSeLogado && logado);

        if (!podeExibir) return null;

        return (
          <ToggleButton
            key={index}
            value="check"
            onClick={() => {
              if (botao.acao) {
                botao.acao();
              } else {
                setTelaAtiva(botao.tela);
              }
            }}
            sx={{
              height: '10vh',
              boxShadow: 1,
              border: '1px solid black',
              backgroundColor: telaAtiva === botao.tela ? '#c5c9c6' : 'white',
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
      <Button
        component="a" 
        href="https://sethtotal.com.br" 
        target="_blank" 
        sx={{ padding: 0 }} 
      >
        
        <img
           src={foto}
          alt="Logo da empresa Seth Total, clique para acessar o site oficial da empresa"
          style={{ width: '100%', height: '100%' }} 
        />
      </Button>
    </Box>
  );
}

import React from 'react';
import Cabecalho from "./Cabecalho";
import Lateral from "./Lateral";
import Conteudo from './Conteudo';
import Login from'./Login';

function Layout() {
  return (
    <>
   
      <Cabecalho />
      <Lateral />
      <Conteudo />
      <Login />

      
    </>
  );
}

export default Layout;
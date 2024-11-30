import React from 'react';
import Cabecalho from "./Cabecalho";
import Lateral from "./Lateral";
import Conteudo from './Conteudo';

function Layout() {
  return (
    <>
      <Cabecalho />
      <Lateral />
      <Conteudo />
    </>
  );
}

export default Layout;
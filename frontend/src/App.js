import React from 'react';

import './global.css';

import Routes from './routes';

export default function App() {
  return (
    <>
      <Routes />
    </>
  );
}

/**
 * <Header title="Semana OmniStack 11.0" /> -> function Header(props) { return <h1>{props.title}</h1> }
 * <Header>Semana OmniStack 11.0</Header> -> function Header(props) { return <h1>{props.children}</h1> }
 * 
 * Ou então, usando a desestruturação:
 * 
 * <Header title="Semana OmniStack 11.0" /> -> function Header({ title }) { return <h1>{title}</h1> }
 * <Header>Semana OmniStack 11.0</Header> -> function Header({ children }) { return <h1>{children}</h1> }
 */

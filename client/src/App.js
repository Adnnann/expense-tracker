import React from 'react';
import MainRouter from './MainRouter';
import './App.css';


function App() {

  const location = window.location.pathname

  return (
    <>
    <MainRouter location={location} />
    </>
  );
}

export default App;

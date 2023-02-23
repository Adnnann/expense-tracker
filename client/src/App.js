import React from 'react';
import MainRouter from './MainRouter';
import './App.css';
import theme from './theme'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import {ApiProvider} from '@reduxjs/toolkit/query/react';
function App() {

 
  return (
   
    <ThemeProvider theme={theme}>
     <StyledEngineProvider injectFirst>
      <MainRouter location={location} />
      </StyledEngineProvider>
    </ThemeProvider>
    
  
  );
}

export default App;

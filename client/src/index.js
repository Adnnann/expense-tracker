import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

const KEY = process.env.REACT_APP_GOOGLE_KEY;

ReactDOM.render(
<GoogleOAuthProvider clientId={`${KEY}.apps.googleusercontent.com`}>
    <Provider store={store}> 
      <App />
     </Provider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);



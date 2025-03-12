import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx'
 import { store } from './redux/store.js';
import { Provider } from 'react-redux';
//import crmStore from './store/index.js';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      
    <Auth0Provider
    domain="dev-p5amcghluym4whyz.us.auth0.com"
    clientId="bezeidbDlPmYroV7rq1AKwgGtjqgLzVO"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>

    </Provider>

   
  </StrictMode>,
)

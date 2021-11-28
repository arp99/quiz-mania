import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/provider"
import { store } from "./app/store";
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import Theme from "./theme/index"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = { store } >
        <ChakraProvider theme={Theme} cssVarsRoot={undefined}>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

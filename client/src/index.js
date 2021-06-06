import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ItemContextProvider } from './store/item-context';

ReactDOM.render(
  <ItemContextProvider>
    <App />
  </ItemContextProvider>,
  document.getElementById('root')
);

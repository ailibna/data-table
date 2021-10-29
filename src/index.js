import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Router';
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

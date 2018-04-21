import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/index';
import './assests';
import registerServiceWorker from './registerServiceWorker';
const {remote} =  window.require("electron");

window.dm = remote.require("./scripts/damo").dmWrapper;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

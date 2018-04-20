import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/index';
import './assests';
import registerServiceWorker from './registerServiceWorker';
import dm from "./js/vbs/damo"

window.dm = dm;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import "./js/remote-main/index"
import './index.css';
import App from './views/index';
import './assests';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

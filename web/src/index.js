import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/styles.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

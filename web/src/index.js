import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/styles.css';

createRoot(document.getElementById('root')).render(<App />);
registerServiceWorker();

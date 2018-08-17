import axios from 'axios';
import store from '../store';

import { config } from './';

const api = {
  call: (method, url, params) => {
    const body = method === 'get' ? 'params' : 'data';
    const options = {
      method: method,
      url: url,
      baseURL: config.getApi(),
      headers: {
        'Cache-Control': 'no-cache',
        'Content-type': 'application/json',
      },
      [body]: params || {}
    };

    const token = api.getToken();

    if (token) {
      options.headers['Authorization'] = 'Bearer ' + token;
      options.url += '?access_token=' + token;
    }

    return axios(options);
  },
  getToken() {
    let state = store.getState();
    let token = null;

    if (state.auth.isAuthenticated && state.auth.token) {
      token = state.auth.token;
    }

    return token;
  }
};

export default api;

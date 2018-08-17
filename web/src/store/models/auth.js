import alertify from 'alertifyjs';

import { api } from '../../config';

const initState = {
  isAuthenticated: false,
  token: null,
  user: null
};

export const auth = {
  state: initState,
  reducers: {
    init() {
      return initState;
    },
    setToken(state, payload) {
      return {
        ...state,
        isAuthenticated: true,
        token: payload.id,
        user: payload.userId
      };
    }
  },
  effects: (dispatch) => ({
    async login(payload) {
      await api.call('post', '/users/login', payload)
        .then(res => {
          if (res.data && res.data.id) {
            this.setToken(res.data);

            alertify.notify('Authenticated!', 'success', 5);
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            alertify.notify('Invalid username or password!', 'error', 5);
          }
        });
    },
    async logout() {
      await api.call('post', '/users/logout')
        .then(() => {
          this.init();
        });
    }
  })
}
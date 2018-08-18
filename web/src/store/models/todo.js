import alertify from 'alertifyjs';

import { api } from '../../config';

const initState = {
  todo: []
};

export const todo = {
  state: initState,
  reducers: {
    init() {
      return initState;
    },
    setTodo(state, payload) {
      return {
        ...state,
        todo: payload
      };
    }
  },
  effects: (dispatch) => ({
    async list() {
      await api.call('get', '/todos')
        .then(res => {
          if (res.status === 200) {
            this.setTodo(res.data);
          }
        });
    },
    async add(payload) {
      await api.call('post', '/todos', payload)
        .then(res => {
          if (res.status === 200) {
            dispatch.todo.list();
            alertify.notify('Success!', 'success', 5);
          }
        })
        .catch(error => {
          console.log('error: ', error);
        });
    },
    async edit(payload) {
      await api.call('patch', '/todos/' + payload.id, payload)
        .then(res => {
          if (res.status === 200) {
            dispatch.todo.list();
            alertify.notify('Success!', 'success', 5);
          }
        })
        .catch(error => {
          console.log('error: ', error);
        });
    },
    async delete(payload) {
      await api.call('delete', '/todos/' + payload.id)
        .then(res => {
          if (res.status === 200) {
            dispatch.todo.list();
            alertify.notify('Success!', 'success', 5);
          }
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }
  })
}
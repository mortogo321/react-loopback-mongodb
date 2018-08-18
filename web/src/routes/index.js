import React, { Component } from 'react';
import { withRouter } from 'react-router';
import alertify from 'alertifyjs';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import store from '../store';
import {
  Home,
  Login,
  Todo,
  TodoAdd,
  TodoEdit
} from '../pages';

const authCheck = (role) => {
  let isValid = false;
  let state = store.getState();

  if (state.auth.isAuthenticated) {
    isValid = true;
  }

  if (!isValid) {
    alertify.notify('Access denied!', 'error', 5);
  }

  return isValid;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (authCheck(rest.for, props)) ?
      (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/auth/login" component={Login} />

        <AuthRoute path="/todo/add" component={TodoAdd} />
        <AuthRoute path="/todo/edit/:id" component={TodoEdit} />
        <AuthRoute path="/todo" component={Todo} />

        <Route exact path="/" component={Home} />
        <Route render={() => (<Redirect to="/" />)} />
      </Switch>
    )
  }
}

export default withRouter(Routes);
import React from 'react';
import alertify from 'alertifyjs';
import {
  Navigate,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';

import store from '../store';
import {
  Home,
  Login,
  Todo,
  TodoAdd,
  TodoEdit
} from '../pages';

const authCheck = () => {
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

const AuthRoute = ({ children }) => {
  const location = useLocation();

  return authCheck() ?
    children : (
      <Navigate
        to="/auth/login"
        state={{ from: location }}
        replace
      />
    );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/auth/login" element={<Login />} />

    <Route path="/todo/add" element={<AuthRoute><TodoAdd /></AuthRoute>} />
    <Route path="/todo/edit/:id" element={<AuthRoute><TodoEdit /></AuthRoute>} />
    <Route path="/todo" element={<AuthRoute><Todo /></AuthRoute>} />

    <Route path="/" element={<Home />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';

import store from '../../../store';
import validators from '../../../validators';
import { Header } from '../../../shared';

const mapState = state => ({
  loading: state.loading.models.auth,
});

class Login extends Component {
  render() {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      isValid
    } = this.props;

    return (
      <Container>
        <Header />

        <Form onSubmit={handleSubmit} className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal text-center">Please log in</h1>

          <FormGroup className="has-feedback">
            <Input
              name="username"
              type="text"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.username && touched.username ? (
                  'form-control is-invalid'
                ) : (
                    'form-control'
                  )
              }
            />
            {errors.username && touched.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </FormGroup>

          <FormGroup className="has-feedback">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? (
                  'form-control is-invalid'
                ) : (
                    'form-control'
                  )
              }
            />
            {errors.password && touched.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </FormGroup>

          <Button type="submit" color="primary" disabled={!isValid || isSubmitting}>
            {this.props.loading ? (<i className="far fa-clock fa-spin"></i>) : (<i className="fas fa-sign-in-alt"></i>)}
            Log in
          </Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(connect(mapState)(withFormik({
  mapPropsToValues: () => ({
    username: '',
    password: ''
  }),
  validate: values => {
    let errors = {};

    errors = validators.minLength(errors, values, 'username', 'at least 4 characters', 4);
    errors = validators.minLength(errors, values, 'password', 'at least 4 characters', 4);

    return errors;
  },
  handleSubmit: async (values, { props, resetForm, setSubmitting }) => {
    await store.dispatch.auth.login(values)

    resetForm();
    setSubmitting(false);

    let state = store.getState();

    if (state.auth.isAuthenticated) {
      props.history.push('/todo');
    }
  },
  displayName: 'LoginForm',
})(Login)));
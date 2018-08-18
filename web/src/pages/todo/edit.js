import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import store from '../../store';
import validators from '../../validators';
import { Header } from '../../shared';

const mapState = state => ({
  loading: state.loading.models.todo,
  todo: state.todo.todo,
  auth: state.auth
});

class TodoEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: moment()
    };

    this.dateChange = this.dateChange.bind(this);
    this.checkbox = this.checkbox.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  async getTodos() {
    await store.dispatch.todo.list();
    this.initForm();
  }

  async initForm() {
    let id = this.props.match.params.id;
    let todo = this.props.todo[id];

    await this.props.setFieldValue('id', todo.id, false);
    await this.props.setFieldValue('title', todo.title, true);
    await this.props.setFieldValue('desc', todo.desc, false);
    await this.props.setFieldValue('date', moment(todo.date).format('DD/MM/YYYY'), true);
    await this.props.setFieldValue('status', todo.status, false);
    await this.props.setFieldValue('ownerId', todo.ownerId, false);
  }

  async dateChange(date) {
    if (date) {
      this.setState({
        startDate: date
      });

      await this.props.setFieldValue('date', moment(date).format('DD/MM/YYYY'), true);
    }
  }

  checkbox(item) {
    return async () => {
      await this.props.setFieldValue(item, !this.props.values[item], false);
    }
  }

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

    if (!this.props.todo.length) {
      return <p>Loading...</p>
    }

    return (
      <Container>
        <Header />

        <Row>
          <Col sm={{ size: 4, offset: 4 }}>
            <h4 className="text-center my-4">Edit Todo</h4>

            <Form onSubmit={handleSubmit}>
              <FormGroup className="has-feedback">
                <Label>Title</Label>
                <Input
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.title && touched.title ? (
                      'form-control is-invalid'
                    ) : (
                        'form-control'
                      )
                  }
                />
                {errors.title && touched.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </FormGroup>

              <FormGroup className="has-feedback">
                <Label>Description</Label>
                <Input
                  name="desc"
                  type="textarea"
                  rows="4"
                  placeholder="Description"
                  value={values.desc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.desc && touched.desc ? (
                      'form-control is-invalid'
                    ) : (
                        'form-control'
                      )
                  }
                />
                {errors.username && touched.desc && (
                  <div className="invalid-feedback">{errors.desc}</div>
                )}
              </FormGroup>

              <FormGroup className="has-feedback">
                <Label>Due Date (DD/MM/YYYY)</Label>
                <DatePicker
                  name="date"
                  value={values.date}
                  selected={this.state.startDate}
                  onChange={this.dateChange}
                  onBlur={handleBlur}
                  dateFormat="DD/MM/YYYY"
                  className={
                    errors.date && touched.date ? (
                      'form-control is-invalid'
                    ) : (
                        'form-control'
                      )
                  }
                />
                {errors.date && touched.date && (
                  <div className="invalid-feedback">{errors.date}</div>
                )}
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input
                    name="status"
                    type="checkbox"
                    onChange={this.checkbox('status')}
                    checked={values.status}
                  />
                  All done.
                </Label>
              </FormGroup>

              <div className="text-center mt-4">
                <Button tag={Link} to="/todo" outline>
                  <i className="fas fa-angle-left"></i>
                  Back
              </Button>

                <Button type="submit" color="success" disabled={!isValid || isSubmitting}>
                  {this.props.loading ? (<i className="far fa-clock fa-spin"></i>) : (<i className="fas fa-save"></i>)}
                  Update
              </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(connect(mapState)(withFormik({
  mapPropsToValues: () => ({
    id: '',
    title: '',
    desc: '',
    date: '',
    status: '',
    ownerId: ''
  }),
  validate: values => {
    let errors = {};

    errors = validators.minLength(errors, values, 'title', 'Required', 4);
    errors = validators.minLength(errors, values, 'date', 'Please select date', 10);

    return errors;
  },
  handleSubmit: async (values, { props, resetForm, setSubmitting }) => {
    alertify.confirm('Update', 'Save change?', async () => {
      values.date = values.date.split('/').reverse().join('-');

      await store.dispatch.todo.edit(values)

      resetForm();
      setSubmitting(false);
      props.history.push('/todo');
    }, () => {
      setSubmitting(false);
    });
  },
  displayName: 'TodoForm',
})(TodoEdit)));
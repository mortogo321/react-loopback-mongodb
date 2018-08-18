import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import moment from 'moment';
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  CardFooter,
  Button
} from 'reactstrap';

import store from '../../store';
import { Header } from '../../shared';

const mapState = state => ({
  loading: state.loading.models.todo,
  todo: state.todo.todo
});

class Todo extends Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  async getTodos() {
    await store.dispatch.todo.list();
  }

  remove(index) {
    return () => {
      let todo = this.props.todo[index];

      alertify.confirm('Remove', 'Are you sure to remove this todo `' + todo.title + '`?', () => {
        store.dispatch.todo.delete(todo);
      }, null);
    }
  }

  renderTodo() {
    let todos = [];

    this.props.todo.forEach((item, index) => {
      todos.push(
        <Col sm="3" key={index} className="mb-4">
          <Card body color={item.status ? 'success' : ''} inverse={item.status}>
            <CardTitle>{item.title}</CardTitle>
            <CardText>{item.desc}</CardText>
            <CardText className="text-right">{moment(item.date).format('DD/MM/YYYY')}</CardText>

            <CardFooter className="text-right">
              <Button color="danger" onClick={this.remove(index)}>
                <i className="far fa-trash-alt"></i>
              </Button>
              <Link to={'/todo/edit/' + index} role="button" className="btn btn-primary">
                <i className="fas fa-pencil-alt"></i>
              </Link>
            </CardFooter>
          </Card>
        </Col>
      );
    });

    if (!todos.length) {
      todos.push(
        <Col key={0}>
          <p className="text-center my-5">- Empty -</p>
        </Col>
      );
    }

    return todos;
  }

  render() {
    if (this.props.loading) {
      return <p>Loading...</p>;
    }

    return (
      <Container>
        <Header />

        <div className="text-center mb-4">
          <Link to="/todo/add" role="button" className="btn btn-primary">
            <i className="fas fa-plus"></i>
            Add Todo
          </Link>
        </div>

        <Row>
          {this.renderTodo()}
        </Row>
      </Container>
    )
  }
}

export default withRouter(connect(mapState)(Todo));
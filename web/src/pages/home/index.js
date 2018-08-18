import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import alertify from 'alertifyjs';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';

import store from '../../store';
import { Header } from '../../shared';

const mapState = state => ({
  auth: state.auth,
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.goTo = this.goTo.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    document.body.className = 'bg-light';
  }

  goTo(path) {
    return () => {
      this.props.history.push(path);
    }
  }

  logout() {
    return () => {
      alertify.confirm('Log out', 'Are you try to logging out?', () => {
        store.dispatch.auth.logout();
      }, null);
    }
  }

  renderList(type) {
    let links = {
      frontEnd: [
        { name: 'React with CSS Preprocessor (Scss)', url: 'https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc' },
        { name: 'React Router', url: 'https://reacttraining.com/react-router/' },
        { name: 'Rematch + Loading + Persist', url: 'https://rematch.gitbooks.io/rematch/content/#getting-started' },
        { name: 'Axios', url: 'https://github.com/axios/axios' },
        { name: 'ReactStrap', url: 'https://reactstrap.github.io/' },
        { name: 'Font Awesome', url: 'https://www.npmjs.com/package/@fortawesome/fontawesome-free' },
        { name: 'Formik', url: 'https://github.com/jaredpalmer/formik' },
        { name: 'React Date Picker', url: 'https://www.npmjs.com/package/react-datepicker' },
        { name: 'Moment.js', url: 'https://momentjs.com/' },
        { name: 'AlertifyJS', url: 'https://alertifyjs.com/' }
      ],
      backEnd: [
        { name: 'Loopback', url: 'https://loopback.io/' },
        { name: 'MongoDB', url: 'https://www.mongodb.com/' }
      ]
    };
    let list = [];

    links[type].forEach((item, index) => {
      list.push(
        <ListGroupItem key={index}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.name}
            <i className="fas fa-external-link-alt"></i>
          </a>
        </ListGroupItem>
      );
    });

    return list;
  }

  render() {
    return (
      <Container>
        <Header />

        <h4 className="text-center">Dependencies:</h4>

        <Row>
          <Col sm={{ size: 4, offset: 2 }}>
            <h5 className="text-center">Front End</h5>
            <ListGroup className="text-left py-2">
              {this.renderList('frontEnd')}
            </ListGroup>
          </Col>

          <Col sm="4">
            <h5 className="text-center">Back End</h5>
            <ListGroup className="text-left py-2">
              {this.renderList('backEnd')}
            </ListGroup>
          </Col>
        </Row>

        <div className="text-center m-4">
          {this.props.auth.isAuthenticated ?
            (
              <Button onClick={this.logout()}>
                Log out
                   <i className="fas fa-sign-out-alt"></i>
              </Button>
            ) : (
              <Button onClick={this.goTo('/auth/login')}>
                <i className="fas fa-user-lock"></i>
                Log in
                  </Button>
            )
          }

          <Button color="primary" onClick={this.goTo('todo')}>
            <i className="fas fa-clipboard-list"></i>
            Todo List
            {this.props.auth.isAuthenticated ? '' : ' (Protected)'}
          </Button>
        </div>
      </Container>
    )
  }
}

export default withRouter(connect(mapState)(Home));
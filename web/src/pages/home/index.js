import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import alertify from 'alertifyjs';
import {
  Container,
  Row,
  Col,
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
      alertify.confirm('Log out', 'Are your try to loggin out?', () => {
        store.dispatch.auth.logout();
      }, null);
    }
  }

  renderList() {
    let links = [
      { name: 'React with CSS Preprocessor (Scss)', url: 'https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc' },
      { name: 'React Router', url: 'https://reacttraining.com/react-router/' },
      { name: 'Rematch', url: 'https://rematch.gitbooks.io/rematch/content/#getting-started' },
      { name: 'Axios', url: 'https://github.com/axios/axios' },
      { name: 'ReactStrap', url: 'https://reactstrap.github.io/' },
      { name: 'Font Awesome', url: 'https://www.npmjs.com/package/@fortawesome/fontawesome-free' },
      { name: 'Formik', url: 'https://github.com/jaredpalmer/formik' },
      { name: 'AlertifyJS', url: 'https://alertifyjs.com/' }
    ];
    let list = [];

    links.forEach((item, index) => {
      list.push(
        <li key={index}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.name}
            <i className="fas fa-external-link-alt"></i>
          </a>
        </li>
      );
    });

    return list;
  }

  render() {
    return (
      <Container>
        <Header />

        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <div className="text-center">
              <h4>Dependencies:</h4>
              <ul className="list-unstyled text-left ml-5 px-5 py-2">
                {this.renderList()}
              </ul>

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
                Todo List
                {this.props.auth.isAuthenticated ? '' : ' (Protected)'}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(connect(mapState)(Home));
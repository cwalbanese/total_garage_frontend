import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';

function LoginForm(props) {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setLogin({ ...login, [name]: value });
  };

  if (props.loggedIn) {
    return <Redirect to="/" />;
  } else if (props.loggedOut) {
    return <Redirect to="/" />;
  }
  return (
    <div className="form-container">
      <Form onSubmit={e => props.handleLogin(e, login)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label htmlFor="username">Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={login.username}
              onChange={handleChange}
              placeholder="Enter Username"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </Form.Group>
        </Form.Row>

        <Button variant="outline-light" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

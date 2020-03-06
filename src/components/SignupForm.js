import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SignupForm(props) {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setLogin({ ...login, [name]: value });
  };

  return (
    <form onSubmit={e => props.handleSignup(e, login)}>
      <h4>Sign Up</h4>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={login.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={login.password}
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  );
}

export default SignupForm;

SignupForm.propTypes = {
  handleSignup: PropTypes.func.isRequired
};

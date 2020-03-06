import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Nav(props) {
  const logged_out_nav = (
    <div>
      <Link to="/login">login</Link>
      <Link to="/signup">signup</Link>
      <h3>{props.loggedIn ? `Hello, ${props.username}` : 'Please Log In'}</h3>
    </div>
  );

  const logged_in_nav = (
    <div>
      <p onClick={props.handleLogout}>logout</p>
      <h3>{props.loggedIn ? `Hello, ${props.username}` : 'Please Log In'}</h3>
    </div>
  );
  return <div>{props.loggedIn ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  displayForm: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

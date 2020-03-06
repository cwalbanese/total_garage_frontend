import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

function Nav(props) {
  const logged_out_nav = (
    <div class="nav">
      <div class="logo">
        T<img class="gear" src="./images/gear-logo.png" alt="gear logo"></img>
        TAL<span class="garage">GARAGE</span>
      </div>
      <div class="login">
        <p>{props.loggedIn ? `Hello, ${props.username}` : 'Please Log In'}</p>
        <Dropdown>
          <Dropdown.Toggle variant="*" id="dropdown-basic">
            <img class="user" src="./images/user.png" alt="user"></img>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/login">login</Dropdown.Item>
            <Dropdown.Item href="/signup">signup</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
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

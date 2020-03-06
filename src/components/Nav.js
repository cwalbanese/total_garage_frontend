import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

function Nav(props) {
  const logged_out_nav = (
    <div className="nav">
      <div className="logo">
        T
        <img
          className="gear"
          src="./images/gear-logo.png"
          alt="gear logo"
        ></img>
        TAL<span className="garage">GARAGE</span>
      </div>
      <div className="login">
        <p>{props.loggedIn ? `Hello, ${props.username}` : 'Please Log In'}</p>
        <Dropdown>
          <Dropdown.Toggle variant="*" id="dropdown-basic">
            <img className="user" src="./images/user.png" alt="user"></img>
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
    <div className="nav">
      <div className="logo">
        T
        <img
          className="gear"
          src="./images/gear-logo.png"
          alt="gear logo"
        ></img>
        TAL<span className="garage">GARAGE</span>
      </div>
      <div className="login">
        <p>{props.loggedIn ? `Hello, ${props.username}` : 'Please Log In'}</p>
        <Dropdown>
          <Dropdown.Toggle variant="*" id="dropdown-basic">
            <img className="user" src="./images/user.png" alt="user"></img>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <span className="logout" onClick={props.handleLogout}>
                logout
              </span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );

  return <div>{props.loggedIn ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
};

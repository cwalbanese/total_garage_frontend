import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  const [displayedForm, setDisplayedForm] = useState('');
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  const [username, setUsername] = useState('');
  const [loggedOut, setLoggedOut] = useState('');

  useEffect(() => {
    if (loggedIn) {
      fetch('https://total-garage.herokuapp.com/garage/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          setUsername(json.username);
        });
    }
  }, [loggedIn]);

  const handleLogin = (e, data) => {
    e.preventDefault();
    fetch('https://total-garage.herokuapp.com/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setLoggedIn(true);
        setLoggedOut(false);
        setUsername(json.user.username);
      });
  };

  const handleSignup = (e, data) => {
    e.preventDefault();
    fetch('https://total-garage.herokuapp.com/garage/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setLoggedIn(true);
        setLoggedOut(false);
        setUsername(json.username);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUsername('');
    setLoggedOut(true);
  };

  return (
    <div className="App">
      <Nav
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        username={username}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LoginForm
            loggedIn={loggedIn}
            loggedOut={loggedOut}
            handleLogin={handleLogin}
          />
        </Route>
        <Route path="/signup">
          <SignupForm loggedIn={loggedIn} handleSignup={handleSignup} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

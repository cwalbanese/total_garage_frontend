import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Search from './components/Search';
import Create from './components/Create';
import Home from './components/Home';
import Results from './components/Results';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Models from './components/Models';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
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
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/create">
          <Create loggedIn={loggedIn} />
        </Route>
        <Route
          exact
          path="/models/:id"
          render={routerProps => {
            return <Models match={routerProps.match} />;
          }}
        />
        <Route
          exact
          path="/models/:year/:model"
          render={routerProps => {
            return <Results match={routerProps.match} />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;

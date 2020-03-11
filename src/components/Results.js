import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function Results(props) {
  const [data, setData] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const model = props.match.params.model;
  const year = props.match.params.year;
  const make = props.match.params.make;
  const loggedIn = props.loggedIn;

  const handleDelete = e => {
    e.preventDefault();
    if (loggedIn) {
      let id = e.target.value;
      fetch(`https://total-garage.herokuapp.com/garage/repairs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`
        },
        mode: 'cors'
      }).then(
        setTimeout(() => {
          setDeleted(true);
        }, 125)
      );
    } else {
      setLoggedOut(true);
    }
  };

  useEffect(() => {
    fetch('https://total-garage.herokuapp.com/garage/repairs/')
      .then(res => res.json())
      .then(response =>
        response.filter(a => a.year === year && a.model === model)
      )
      .then(res =>
        res.sort((a, b) => (parseInt(a.miles) > parseInt(b.miles) ? 1 : -1))
      )
      .then(setData);
  }, [deleted]);

  const handleClose = () => setLoggedOut(false);

  if (loggedOut) {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Access Denied</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>You have to be logged in to do that.</p>
        </Modal.Body>

        <Modal.Footer>
          <a href="/signup">
            <Button variant="warning">Signup</Button>
          </a>

          <a href="/login">
            <Button variant="primary">Login</Button>
          </a>

          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }

  if (data) {
    return (
      <>
        <p>Results for {model}</p>
        <ul>
          {data.map(repair => (
            <div key={repair.id}>
              <p>
                Miles: {repair.miles} Repair: {repair.repair}
              </p>
              <Link to={'/' + repair.id + '/edit'}>
                <Button variant="primary">Edit</Button>
              </Link>
              &nbsp;
              <Button
                id={repair.model}
                value={repair.id}
                onClick={handleDelete}
                variant="danger"
              >
                Delete
              </Button>
            </div>
          ))}
        </ul>
      </>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default Results;

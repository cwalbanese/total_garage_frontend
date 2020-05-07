import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

// results for selected data
function Results(props) {
  const [data, setData] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const model = props.match.params.model;
  const year = props.match.params.year;
  const loggedIn = props.loggedIn;

  // deletes selected data by id
  const handleDelete = (e) => {
    e.preventDefault();
    if (loggedIn) {
      let id = e.target.value;
      fetch(`https://total-garage.herokuapp.com/garage/repairs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
        mode: 'cors',
      }).then(
        setTimeout(() => {
          setDeleted(true);
        }, 125)
      );
    } else {
      setLoggedOut(true);
    }
  };

  // reloads data everytime something is deleted
  useEffect(() => {
    fetch('https://total-garage.herokuapp.com/garage/repairs/')
      .then((res) => res.json())
      .then((response) =>
        response.filter((a) => a.year === year && a.model === model)
      )
      .then((res) =>
        res.sort((a, b) => (parseInt(a.miles) > parseInt(b.miles) ? 1 : -1))
      )
      .then(setData);
  }, [deleted]);

  const handleClose = () => setLoggedOut(false);

  // loggedOut will become true if you try to delete while logged out
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

  // if data has been returned from fetch, show the data
  if (data) {
    return (
      <div>
        <p className="results-message">Results for {model}:</p>
        <div className="results">
          {data.map((repair) => (
            <div key={repair.id}>
              <div className="results-item">
                <div className="button-pair">
                  <Link to={'/' + repair.id + '/edit'}>
                    <Button variant="outline-dark" size="sm">
                      Edit
                    </Button>
                  </Link>
                  &nbsp;
                  <Button
                    id={repair.model}
                    value={repair.id}
                    onClick={handleDelete}
                    variant="outline-dark"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="results-text">
                  <span className="orange-text">Miles: </span>
                  {repair.miles}{' '}
                  <span className="orange-text">
                    &nbsp;&nbsp;&nbsp;&nbsp;Repair:{' '}
                  </span>
                  {repair.repair}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    // displays while fetch loads
    return <p>loading...</p>;
  }
}

export default Results;

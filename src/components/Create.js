import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function Create(props) {
  const [form, setForm] = useState({
    model: '',
    miles: '',
    repair: '',
    year: '',
    make: ''
  });
  const [createdId, setCreatedId] = useState('');

  const handleCreate = e => {
    e.preventDefault();
    fetch('https://total-garage.herokuapp.com/garage/repairs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`
      },
      mode: 'cors',
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => {
        setCreatedId(data.id);
      });
  };

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };

  if (createdId) {
    return <Redirect to="/thankyou" />;
  }

  if (props.loggedIn) {
    return (
      <form onSubmit={handleCreate}>
        <h4>Create</h4>
        <label htmlFor="year">Year: </label>
        <input type="text" name="year" onChange={handleChange} />
        <label htmlFor="year">Make: </label>
        <input type="text" name="make" onChange={handleChange} />
        <label htmlFor="model">Model: </label>
        <input type="text" name="model" onChange={handleChange} />
        <label htmlFor="miles">Miles: </label>
        <input type="text" name="miles" onChange={handleChange} />
        <label htmlFor="repair">Repair: </label>
        <input type="text" name="repair" onChange={handleChange} />
        <input type="submit" />
      </form>
    );
  } else {
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

          <a href="/">
            <Button variant="danger">Close</Button>
          </a>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default Create;

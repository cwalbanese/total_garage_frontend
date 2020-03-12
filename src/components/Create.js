import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
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
      <div className="form-container">
        <Form onSubmit={handleCreate}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type="text"
                name="year"
                onChange={handleChange}
                placeholder="Enter Year (1994)"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Make:</Form.Label>
              <Form.Control
                type="text"
                name="make"
                onChange={handleChange}
                placeholder="Enter Make (Ford)"
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Model:</Form.Label>
              <Form.Control
                type="text"
                name="model"
                onChange={handleChange}
                placeholder="Enter Model (Taurus)"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Miles:</Form.Label>
              <Form.Control
                type="text"
                name="miles"
                onChange={handleChange}
                placeholder="Enter Miles (105000)"
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Repair:</Form.Label>
            <Form.Control
              type="text"
              name="repair"
              onChange={handleChange}
              as="textarea"
              rows="3"
            />
          </Form.Group>
          <Button variant="outline-light" type="submit">
            Submit
          </Button>
        </Form>
      </div>
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

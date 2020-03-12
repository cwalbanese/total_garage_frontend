import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function Edit(props) {
  const [form, setForm] = useState({
    model: '',
    miles: '',
    repair: '',
    year: '',
    make: ''
  });
  const [data, setData] = useState('');
  const [createdId, setCreatedId] = useState('');
  const id = props.match.params.id;

  useEffect(() => {
    fetch(`https://total-garage.herokuapp.com/garage/repairs/${id}`)
      .then(res => res.json())
      .then(setData);
  }, []);

  const handleEdit = e => {
    e.preventDefault();
    const repair = {
      year: form.year ? form.year : data.year,
      make: form.make ? form.make : data.make,
      model: form.model ? form.model : data.model,
      miles: form.miles ? form.miles : data.miles,
      repair: form.repair ? form.repair : data.repair
    };
    fetch(`https://total-garage.herokuapp.com/garage/repairs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`
      },
      mode: 'cors',
      body: JSON.stringify(repair)
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
        <Form onSubmit={handleEdit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridYear">
              <Form.Label htmlFor="year">Year:</Form.Label>
              <Form.Control
                type="text"
                name="year"
                onChange={handleChange}
                defaultValue={data.year}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridMake">
              <Form.Label htmlFor="make">Make:</Form.Label>
              <Form.Control
                type="text"
                name="make"
                onChange={handleChange}
                defaultValue={data.make}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridModel">
              <Form.Label htmlFor="model">Model:</Form.Label>
              <Form.Control
                type="text"
                name="model"
                onChange={handleChange}
                defaultValue={data.model}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridMiles">
              <Form.Label htmlFor="miles">Miles:</Form.Label>
              <Form.Control
                type="text"
                name="miles"
                onChange={handleChange}
                defaultValue={data.miles}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="repairTextArea">
            <Form.Label htmlFor="repair">Repair:</Form.Label>
            <Form.Control
              type="text"
              name="repair"
              onChange={handleChange}
              defaultValue={data.repair}
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

export default Edit;

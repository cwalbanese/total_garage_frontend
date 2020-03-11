import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function Results(props) {
  const [data, setData] = useState('');
  const [deleted, setDeleted] = useState(false);
  const model = props.match.params.model;
  const year = props.match.params.year;

  const handleDelete = e => {
    e.preventDefault();
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

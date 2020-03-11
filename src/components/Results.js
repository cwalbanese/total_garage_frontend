import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function Results(props) {
  const [data, setData] = useState('');
  const [deleted, setDeleted] = useState(false);
  const model = props.match.params.model;
  const year = parseInt(props.match.params.year);
  let id = 1;

  const handleDelete = e => {
    e.preventDefault();
    id = e.target.value;
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
    fetch(`https://total-garage.herokuapp.com/garage/repairs/`)
      .then(res => res.json())
      .then(items => {
        return items.filter(item => item.model === model && item.year === year);
      })
      .then(items => items.sort((a, b) => (a.miles > b.miles ? 1 : -1)))
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
              <Button variant="primary">Edit</Button>&nbsp;
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Results(props) {
  const [data, setData] = useState('');
  const model = props.match.params.model;
  const year = parseInt(props.match.params.year);

  useEffect(() => {
    fetch(`https://total-garage.herokuapp.com/garage/repairs/`)
      .then(res => res.json())
      .then(items => {
        return items.filter(item => item.model === model && item.year === year);
      })
      .then(items => items.sort((a, b) => (a.miles > b.miles ? 1 : -1)))
      .then(setData);
  }, []);

  if (data) {
    return (
      <>
        <p>Results for {model}</p>
        <ul>
          {data.map(repair => (
            <p key={repair.id}>
              Miles: {repair.miles} Repair: {repair.repair}
            </p>
          ))}
        </ul>
      </>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default Results;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Models(props) {
  const [data, setData] = useState('');
  const year = props.match.params.id;

  useEffect(() => {
    fetch(`https://total-garage.herokuapp.com/garage/repairs/`)
      .then(res => res.json())
      .then(items => {
        return items.filter(item => item.year === parseInt(year));
      })
      .then(response => {
        const unique = Array.from(new Set(response.map(a => a.model))).map(
          model => {
            return response.find(a => a.model === model);
          }
        );
        setData(unique);
      });
  }, []);

  if (data) {
    return (
      <>
        <p>Models</p>
        <ul>
          {data.map(repair => (
            <Link id="link" to={'/results/' + repair.id} key={repair.id}>
              <p>{repair.model}</p>
            </Link>
          ))}
        </ul>
      </>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default Models;

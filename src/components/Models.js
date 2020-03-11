import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Models(props) {
  const [data, setData] = useState('');
  const year = props.match.params.year;

  useEffect(() => {
    fetch(`https://total-garage.herokuapp.com/garage/repairs/`)
      .then(res => res.json())
      .then(response => {
        return response.filter(item => item.year === year);
      })
      .then(response => {
        const unique = Array.from(new Set(response.map(a => a.make))).map(
          make => {
            return response.find(a => a.make === make);
          }
        );
        setData(unique);
      });
  }, []);

  if (data && data !== []) {
    console.log(data);
    return (
      <>
        <p>Makes</p>
        <ul>
          {data.map(repair => (
            <Link
              id="link"
              to={'/models/' + repair.year + '/' + repair.make}
              key={repair.id}
            >
              <p>{repair.make}</p>
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

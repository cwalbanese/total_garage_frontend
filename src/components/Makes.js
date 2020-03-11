import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Makes(props) {
  const [data, setData] = useState('');
  const year = props.match.params.year;

  useEffect(() => {
    fetch('https://total-garage.herokuapp.com/garage/repairs/')
      .then(res => res.json())
      .then(response => response.filter(a => a.year === year))
      .then(items => items.sort((a, b) => (a.make > b.make ? 1 : -1)))
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
    return (
      <>
        <p className="welcome-message">Select a make:</p>
        {data.map(repair => (
          <Link
            id="link"
            to={'/makes/' + repair.year + '/' + repair.make}
            key={repair.id}
          >
            <p>{repair.make}</p>
          </Link>
        ))}
      </>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default Makes;

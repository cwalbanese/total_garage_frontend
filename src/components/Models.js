import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// search page to select model
function Models(props) {
  const [data, setData] = useState('');
  const year = props.match.params.year;
  const make = props.match.params.make;

  // fetch all data and save models from chosen year and make
  useEffect(() => {
    fetch('https://total-garage.herokuapp.com/garage/repairs/')
      .then(res => res.json())
      .then(response =>
        response.filter(a => a.year === year && a.make === make)
      )
      .then(items => items.sort((a, b) => (a.model > b.model ? 1 : -1)))
      .then(response => {
        const unique = Array.from(new Set(response.map(a => a.model))).map(
          model => {
            return response.find(a => a.model === model);
          }
        );
        setData(unique);
      });
  }, []);

  // if data has been saved, display list of models
  if (data && data !== []) {
    return (
      <div className="search-list">
        <p className="welcome-message">Please select a model:</p>

        {data.map(repair => (
          <Link
            id="link"
            to={
              '/makes/' + repair.year + '/' + repair.make + '/' + repair.model
            }
            key={repair.id}
          >
            <p className="list-item">{repair.model}</p>
          </Link>
        ))}
      </div>
    );
  } else {
    // displays while fetch is running
    return <p>loading...</p>;
  }
}

export default Models;

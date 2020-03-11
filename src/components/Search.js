import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Home() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('https://total-garage.herokuapp.com/garage/repairs/')
      .then(res => res.json())
      .then(items => items.sort((a, b) => (a.year > b.year ? 1 : -1)))
      .then(response => {
        const unique = Array.from(new Set(response.map(a => a.year))).map(
          model => {
            return response.find(a => a.year === model);
          }
        );
        setData(unique);
      });
  }, []);

  if (data) {
    return (
      <div className="search-list">
        <p className="welcome-message">Please select a year:</p>

        {data.map(year => (
          <Link id="link" to={'/makes/' + year.year} key={year.id}>
            <p className="list-item">{year.year}</p>
          </Link>
        ))}
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default Home;

// , {
//   headers: {
//     Authorization: `JWT ${localStorage.getItem('token')}`
//   }
// }

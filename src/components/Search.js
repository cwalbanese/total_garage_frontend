import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Home() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('https://total-garage.herokuapp.com/garage/years/')
      .then(res => res.json())
      .then(items => items.sort((a, b) => (a.year_make > b.year_make ? 1 : -1)))
      .then(setData);
  }, []);

  if (data) {
    return (
      <>
        <p>Search</p>
        <ul>
          {data.map(year => (
            <Link id="link" to={'/models/' + year.id} key={year.id}>
              <p>{year.year_make}</p>
            </Link>
          ))}
        </ul>
      </>
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

import React from 'react';

function Home() {
  return (
    <div>
      <p className="welcome-message">
        Welcome to Total Garage, where you can search for repairs when car
        shopping or fixing your own car.
      </p>
      <div className="home-container">
        <a href="/search" id="link">
          <div className="home-button">
            <img className="car-button" src="./images/car.png" alt="car"></img>
            <p id="search-message">Search Repairs</p>
          </div>
        </a>
        <a href="/create" id="link">
          <div className="home-button">
            <img
              className="wrench-button"
              src="./images/wrench.png"
              alt="wrench"
            ></img>
            <p id="create-message">Create Repair</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Home;

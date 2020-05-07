import React from 'react';

// basic home page build and navigation
function Home() {
  return (
    <div>
      <div className="welcome-div">
        <p className="welcome-message">
          Welcome to Total Garage! Would you like to search our database for
          previous repairs? Or submit a repair for others to view?
        </p>
      </div>

      <div className="home-container">
        <a href="/search" id="link">
          <div className="home-button">
            <img className="car-button" src="./images/car.png" alt="car"></img>
            <p id="search-message">SEARCH</p>
          </div>
        </a>
        <a href="/create" id="link">
          <div className="home-button">
            <img
              className="wrench-button"
              src="./images/wrench.png"
              alt="wrench"
            ></img>
            <p id="create-message">CREATE</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Home;

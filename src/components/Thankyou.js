import React from 'react';

// displays thank you message for creating or editing a submission
function Thankyou() {
  return (
    <div className="search-list">
      <p className="welcome-message">
        Thank you! The action was completed successfully.
      </p>
      <a className="list-item return-home" id="link" href="/">
        Return Home
      </a>
    </div>
  );
}

export default Thankyou;

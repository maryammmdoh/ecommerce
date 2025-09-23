
import React from 'react';
import './MySpinner.css';

const MySpinner = () => {
  return (
    <div className="my-spinner" aria-label="Loading...">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default MySpinner;

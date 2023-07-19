import React from 'react';
import './spinner.styles.css';

const Spinner = () => {
  return (
    <div className="spinnerOverlay">
      <div className="spinnerContainer">.</div>
    </div>
  );
};

export default Spinner;

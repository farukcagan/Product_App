

import React from 'react';
import './Loading.css';

interface SpinnerProps {
}

const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;

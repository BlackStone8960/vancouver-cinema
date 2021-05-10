import React from 'react';
import Seats from './Seats';

const BookingSeat = () => {
  return (
    <div className="seat-container">
      <div className="seat-description">
        <div className="seat-dummy"></div><span>N/A</span>
        <div className="seat-dummy active"></div><span>Selected</span>
        <div className="seat-dummy reserved"></div><span>Occupied</span>
      </div>
      <Seats />
    </div>
  );
};

export { BookingSeat as default };
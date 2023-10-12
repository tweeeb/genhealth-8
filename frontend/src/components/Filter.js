// src/components/Filter.js
import React, { useState } from 'react';
import './Filter.css';
import Search from './images/search icon.png'

const Filter = ({ onFilterSubmit }) => {
  const [dataName, setDataName] = useState('');
  const [dataValue, setDataValue] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null); 

    // 验证name 
    if (!dataName.trim()) {
        setError('Data name is required.');
        return;
    }

    // If dataValue is provided, validate it
    if (dataValue && (!/^\d+$/.test(dataValue) || parseInt(dataValue, 10) < 0)) {
        setError('Data value must be a non-negative integer if provided.');
        return;
    }
    
    onFilterSubmit(dataName, dataValue);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        placeholder="Family/Given Name"
        value={dataName}
        onChange={(e) => setDataName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Data Value (Optional)"
        value={dataValue}
        onChange={(e) => setDataValue(e.target.value)}
      />
      <button type="submit" className="search-button">
        <img src={Search} alt="Search" className="search-icon" />
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Filter;

// src/components/Filter.js

import React, { useState } from 'react';

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

    // 验证Value
    if (!/^\d+$/.test(dataValue) || parseInt(dataValue, 10) < 0) {
        setError('Data value must be a non-negative integer.');
        return;
      }
    
    onFilterSubmit(dataName, dataValue);

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Data Name"
        value={dataName}
        onChange={(e) => setDataName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Data Value"
        value={dataValue}
        onChange={(e) => setDataValue(e.target.value)}
      />
      <button type="submit">Filter</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Filter;

import React, { useState } from 'react';
import './Filter.css';
import Search from './images/search icon.png';

const Filter = ({ onFilterSubmit }) => {
  const [dataName, setDataName] = useState('');
  const [minDataValue, setMinDataValue] = useState('');
  const [maxDataValue, setMaxDataValue] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null); 

    // 验证name 
    if (!dataName.trim()) {
        setError('Data name is required.');
        return;
    }

    // 验证最小值和最大值
    if (minDataValue && (!/^\d*\.?\d+$/.test(minDataValue) || parseFloat(minDataValue) < 0)) {
        setError('Min data value must be a non-negative number if provided.');
        return;
    }
    if (maxDataValue && (!/^\d*\.?\d+$/.test(maxDataValue) || parseFloat(maxDataValue) < 0)) {
        setError('Max data value must be a non-negative number if provided.');
        return;
    }

    // 验证最小值是否小于最大值
    if (minDataValue && maxDataValue && parseFloat(minDataValue) > parseFloat(maxDataValue)) {
        setError('Min data value should not be greater than max data value.');
        return;
    }
    
    onFilterSubmit(dataName, minDataValue, maxDataValue);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        placeholder="Data Name"
        value={dataName}
        onChange={(e) => setDataName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Data Value (Min)"
        value={minDataValue}
        onChange={(e) => setMinDataValue(e.target.value)}
      />
      <input
        type="text"
        placeholder="Data Value (Max)"
        value={maxDataValue}
        onChange={(e) => setMaxDataValue(e.target.value)}
      />
      <button type="submit" className="search-button">
        <img src={Search} alt="Search" className="search-icon" />
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Filter;

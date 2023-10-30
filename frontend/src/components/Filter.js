import React, { useState, useEffect } from 'react';
import './Filter.css';
import Search from './images/search icon.png';

const Filter = ({ onFilterSubmit }) => {
  const [dataName, setDataName] = useState('');
  const [minDataValue, setMinDataValue] = useState('');
  const [maxDataValue, setMaxDataValue] = useState('');
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const [patientsData, setFpatientsData] = useState({});
  const [minValueSuggestion, setMinValueSuggestion] = useState(''); 
  const [maxValueSuggestion, setMaxValueSuggestion] = useState('');

  
  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:18000/api/filter/getDataValue")
      .then(response => response.json())
      .then(data => {
        setOptions(Object.keys(data)); // Extract keys from the fetched JSON and set them as options
        setFpatientsData(data);  // Store the fetched data 
      })
      .catch(error => {
        console.error("Error fetching the data:", error);
        setError('Failed to fetch options from the server.');
      });
  }, []);

  
  const handleMinClick = () => {
    if (!dataName) {
      setMinValueSuggestion(''); 
      return;
    }
  
    const valuesArray = patientsData[dataName]?.value;
    if (valuesArray && Array.isArray(valuesArray)) {
      const minValue = Math.min(...valuesArray.map(item => parseFloat(item[0].value)));
      setMinValueSuggestion(minValue.toString()); 
    } else {
      setMinValueSuggestion('');
    }
  }

  const handleMaxClick = () => {
    if (!dataName) {
      setMaxValueSuggestion(''); 
      return;
    }
  
    const valuesArray = patientsData[dataName]?.value;
    if (valuesArray && Array.isArray(valuesArray)) {
      const maxValue = Math.max(...valuesArray.map(item => parseFloat(item[0].value)));
      setMaxValueSuggestion(maxValue.toString()); 
    } else {
      setMaxValueSuggestion('');
    }
  }  

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null); 

    // Verify name 
    if (!dataName.trim()) {
        setError('Data name is required.');
        return;
    }

    // Verify minimum and maximum values
    if (minDataValue && (!/^\d*\.?\d+$/.test(minDataValue) || parseFloat(minDataValue) < 0)) {
        setError('Min data value must be a non-negative number if provided.');
        return;
    }
    if (maxDataValue && (!/^\d*\.?\d+$/.test(maxDataValue) || parseFloat(maxDataValue) < 0)) {
        setError('Max data value must be a non-negative number if provided.');
        return;
    }

    // Verify that the minimum value is less than the maximum value
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
        list="dataNames"
        value={dataName}
        onChange={(e) => setDataName(e.target.value)}
      />
      <datalist id="dataNames">
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>


      <input
        type="text"
        placeholder="Data Value (Min)"
        list="minValues"
        value={minDataValue}
        onChange={(e) => setMinDataValue(e.target.value)}
        onFocus={handleMinClick}
      />
      <datalist id="minValues">
        {minValueSuggestion && <option value={minValueSuggestion} />}
      </datalist>


      <input
        type="text"
        placeholder="Data Value (Max)"
        list="maxValues"
        value={maxDataValue}
        onChange={(e) => setMaxDataValue(e.target.value)}
        onFocus={handleMaxClick}
      />
      <datalist id="maxValues">
        {maxValueSuggestion && <option value={maxValueSuggestion} />}
      </datalist>

      
      <button type="submit" className="search-button">
        <img src={Search} alt="Search" className="search-icon" />
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Filter;

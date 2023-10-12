// src/components/FindPatient.js

import React, { useState } from 'react';
import Filter from './Filter';

const FindPatient = () => {
  const [filteredPatients, setFilteredPatients] = useState([]);

  const handleFilterSubmit = async (dataName, dataValue) => {
    try {
      const response = await fetch('/api/patients/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataName, dataValue }),
      });
      const data = await response.json();
      setFilteredPatients(data);
    } catch (error) {
      console.error('Error fetching filtered patients:', error);
    }
  };

  return (
    <div>
      <Filter onFilterSubmit={handleFilterSubmit} />
      <ul>
        {filteredPatients.map(patient => (
          <li key={patient.id}>{patient.name} - {patient.age} yrs </li>
        ))}
      </ul>
    </div>
  );
};

export default FindPatient;

import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import './FindPatient.css';

function TopBar() {
  return <div className="top-bar">DIGIHEALTH</div>;
}

const FindPatient = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:18000/api/patientData/get');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  const handleFilterSubmit = async (dataName, dataValue) => {
    const filtered = patients.filter(patient => 
      patient.resource.name.some(n => n.given[0].toLowerCase().includes(dataValue.toLowerCase()))
    );
    setFilteredPatients(filtered);
    setShowResults(true);
  };

  const renderPatientName = (nameObj) => {
    const givenName = nameObj.given.join(' ');
    const familyName = nameObj.family;
    const prefix = nameObj.prefix ? nameObj.prefix.join(' ') + ' ' : '';
    return `${prefix}${givenName} ${familyName}`;
  };

  return (
    <div className="find-patient-container">
      <TopBar />

      {showResults ? (
        <>
          <h2 id="patientAwait">Please choose the patient you are looking for:</h2>
          <ul className="patient-list">
            {filteredPatients.map(patient => (
              <li key={patient.resource.id}>
                <input type="radio" name="selectedPatient" id={`patient-${patient.resource.id}`} />
                <label htmlFor={`patient-${patient.resource.id}`}>
                  {renderPatientName(patient.resource.name[0])}
                </label>
                <span>ID: {patient.resource.id}</span>
              </li>
            ))}
          </ul>
          <button className="patientTreatment" onClick={() => window.location.href='/Treatment'}>NEXT</button>
        </>
      ) : (
        <>
          <h1 id="findPatientHeader">Find Patient</h1>
          <Filter onFilterSubmit={handleFilterSubmit} />
          <a className="patient-list"></a>
        </>
      )}
    </div>
  );
};

export default FindPatient;

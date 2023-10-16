import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import './FindPatient.css';

function TopBar() {
  return <div className="top-bar">DIGIHEALTH</div>;
}

const FindPatient = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const response = await fetch('http://localhost:18000/api/filter/getDataValue');
        const data = await response.json();
        setPatientsData(data);
      } catch (error) {
        console.error('Error fetching patients data:', error);
      }
    };

    const fetchAllPatients = async () => {
      try {
        const response = await fetch('http://localhost:18000/api/patientData/get');
        const data = await response.json();
        setAllPatients(data);
      } catch (error) {
        console.error('Error fetching all patients:', error);
      }
    };

    fetchPatientsData();
    fetchAllPatients();
  }, []);
  
  const handleFilterSubmit = async (dataNameInput, minDataValueInput, maxDataValueInput) => {
    const matchedPatientIds = [];

    const valuesArray = patientsData[dataNameInput]?.value;
    if (valuesArray) {
      for (const item of valuesArray) {
        const value = item[0].value;
        if (
          (!minDataValueInput || value >= parseFloat(minDataValueInput)) &&
          (!maxDataValueInput || value <= parseFloat(maxDataValueInput))
        ) {
          matchedPatientIds.push(item[1].split('/')[1]);
        }
      }
    }

    const matchedPatients = allPatients.filter(patient => 
      matchedPatientIds.includes(patient.resource.id)
    ).map(patient => {
      const nameObj = patient.resource.name[0];
      const birthDate = new Date(patient.resource.birthDate);
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthDate.getFullYear();

      return {
        id: patient.resource.id,
        name: `${nameObj.prefix[0]} ${nameObj.given[0]} ${nameObj.family}`,
        age: age
      };
    });

    setFilteredPatients(matchedPatients);
    setShowResults(true);
  };
  
  const renderPatientName = (patient) => {
    return `${patient.name} (Age: ${patient.age})`;
  };

  return (
    <div className="find-patient-container">
      <TopBar />

      {showResults ? (
        <>
          <h2 id="patientAwait">Please choose the patient you are looking for:</h2>
          <ul className="patient-list">
            {filteredPatients.map(patient => (
              <li key={patient.id}>
                <input type="radio" name="selectedPatient" id={`patient-${patient.id}`} />
                <label htmlFor={`patient-${patient.id}`}>
                  {renderPatientName(patient)}
                </label>
                <span>ID: {patient.id}</span>
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

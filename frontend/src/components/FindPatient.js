// src/components/FindPatient.js

import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Filter from './subcomponents/Filter';
import './FindPatient.css';
import Button from '@mui/material/Button';
import TopBar from './subcomponents/TopBar';

const FindPatient = () => {
  const [patientsData, setPatientsData] = useState([]);
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

    fetchPatientsData();
  }, []);
  
  const fetchOnePatient = async (id) => {
    try {
      const response = await fetch(`http://localhost:18000/api/patientData/get-one-patient/${id}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error(`Error fetching patient with ID ${id}:`, await response.text());
        return null;
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
      return null;
    }
  };
  
  const handleFilterSubmit = async (dataNameInput, minDataValueInput, maxDataValueInput) => {
    const matchedPatientIds = [];
    const matchedPatientDataValues = [];

    const valuesArray = patientsData[dataNameInput]?.value;
    if (valuesArray) {
      for (const item of valuesArray) {
        if (Array.isArray(item) && item[0] && typeof item[0].value !== 'undefined') {
          const value = item[0].value;
          if (
            (!minDataValueInput || value >= parseFloat(minDataValueInput)) &&
            (!maxDataValueInput || value <= parseFloat(maxDataValueInput))
          ) {
            matchedPatientIds.push(item[1].split('/')[1]);
            matchedPatientDataValues.push(item[0].value.toFixed(2)); 
          }
        }
      }
    }

    const matchedPatientsPromises = matchedPatientIds.map(async (id, index) => {
      const patient = await fetchOnePatient(id);
      if (patient) {
        const nameObj = patient.name[0];
        const birthDate = new Date(patient.birthDate);
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthDate.getFullYear();

        return {
          id: patient.id,
          name: `${nameObj.prefix[0]} ${nameObj.given[0]} ${nameObj.family}`,
          age: age,
          dataValue: matchedPatientDataValues[index], 
          dataName: dataNameInput,
          unit: patientsData[dataNameInput]?.unit 
        };
      }
      return null;
    });

    const matchedPatientsResults = await Promise.all(matchedPatientsPromises);
    const validMatchedPatients = matchedPatientsResults.filter(patient => patient !== null);

    setFilteredPatients(validMatchedPatients);
    setShowResults(true);
  };
  
  const renderPatientName = (patient) => {
    return (
        <>
            {patient.name}
            <span className="spacing"></span>
            Age: {patient.age} yrs
            <span className="spacing"></span>
            {patient.dataName}: {patient.dataValue} {patient.unit}
        </>
    );
  };

  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAllChange = () => {
      setSelectAll(prev => !prev);
  }
  
  useEffect(() => {
      const checkboxes = document.querySelectorAll('input[name="selectedPatient"]');
      checkboxes.forEach(checkbox => {
          checkbox.checked = selectAll;
      });
  }, [selectAll]);
  
  async function handleSavePatients() {
    // 获取所有的checkbox
    const checkboxes = document.querySelectorAll('input[name="selectedPatient"]');
    const selectedPatientIds = [];

    // 遍历checkbox并获取被选中的ID
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          selectedPatientIds.push(checkbox.id.split('-').slice(1).join('-'));
        }
    });

    // 如果没有选择任何患者，返回
    if (selectedPatientIds.length === 0) {
        alert("Please select at least one patient.");
        return;
    }
    //get current saved patients.
    let existingPatients = JSON.parse(localStorage.getItem("patientList"))
    console.log(existingPatients)
    if (existingPatients.length === 0) {
      // directly paste in
      localStorage.setItem("patientList", JSON.stringify(selectedPatientIds))
    } else {
      for (const id of selectedPatientIds) {
      // check no doubles
        if (!existingPatients.includes(id)) {
          existingPatients.push(id)
        }
      }
      localStorage.setItem("patientList", JSON.stringify(existingPatients))
    }
    alert("Patients saved successfully."); // 只有在所有患者ID都保存成功后才显示此消息
  }
  
  return (
      <div className="find-patient-container">
          <TopBar />
          {showResults ? (
              <>
                  <h2 id="patientAwait">Please choose the patient you are looking for:</h2>
                  <div className="patient-list-container">
                      <div className="select-all-container">
                          <input type="checkbox" name="selectAll" id="select-all" onChange={handleSelectAllChange} />
                          <label htmlFor="select-all">Select All</label>
                      </div>
                      {filteredPatients.map(patient => (
                          <div className="patient-item" key={patient.id}>
                              <input type="checkbox" name="selectedPatient" id={`patient-${patient.id}`} />
                              <label htmlFor={`patient-${patient.id}`}>
                                  {renderPatientName(patient)}
                              </label>
                              <span>ID: {patient.id}</span>
                          </div>
                      ))}
                  </div>
                  <Button id="fixed-button-1"  size="large" variant="contained"  onClick={handleSavePatients}>SAVE</Button>
                  {/* <button className="savePatientsButton" onClick={handleSavePatients}>SAVE</button> */}
                  <Button id="fixed-button-2"  size="large" variant="contained"  component={Link} to={'/PatientList'}>NEXT</Button>
                  {/* <button className="patientTreatment" onClick={() => window.location.href='/PatientList'}>NEXT</button> */}
              </>
          ) : (
              <>
                  <h1 id="findPatientHeader">Find Patient</h1>
                  <Filter onFilterSubmit={handleFilterSubmit} />
              </>
          )}
      </div>
  );

};

export default FindPatient;
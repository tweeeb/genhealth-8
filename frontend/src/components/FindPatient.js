// src/components/FindPatient.js

import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Filter from './Filter';
import './FindPatient.css';

function TopBar() {
  return <div className="top-bar" onClick={() => window.location.href='/'}>DIGIHEALTH</div>;
}

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
        const value = item[0].value;
        if (
          (!minDataValueInput || value >= parseFloat(minDataValueInput)) &&
          (!maxDataValueInput || value <= parseFloat(maxDataValueInput))
        ) {
          matchedPatientIds.push(item[1].split('/')[1]);
          matchedPatientDataValues.push(item[0].value.toFixed(2)); // 保存两位小数的值
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

    // 对于每个选中的患者ID，发送到后端
    for (const id of selectedPatientIds) {
        try {
            const response = await fetch('http://localhost:18000/api/save/save-patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ patientId: id })
            });
            
            if (!response.ok) {
                console.error('Error saving patient ID:', id, 'Error:', await response.text());
                alert("Error saving selected patients.");
                return; // 如果保存某个患者时出现错误，则提前终止操作
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error saving selected patients.");
            return; // 如果出现错误，则提前终止操作
        }
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
                  <button className="savePatientsButton" onClick={handleSavePatients}>SAVE</button>
                  <button className="patientTreatment" onClick={() => window.location.href='/PatientList'}>NEXT</button>
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

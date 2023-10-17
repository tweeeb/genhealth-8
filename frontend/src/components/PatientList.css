// src/components/PatientList.js

import React, { useState, useEffect } from 'react';
import './PatientList.css';
import Search from './images/search icon.png'

function TopBar() {
    return <div className="top-bar">DIGIHEALTH</div>;
}

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="search-box">
                <input type="text" className="search-input" placeholder="Search Patient..." />
                <button type="submit" className="search-btn">
                    <img className="search-icon" src={Search} alt="🔍" />
                </button>
            </div>
        </div>
    );
}

const PatientListContent = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function fetchAllPatients() {
      try {
        const response = await fetch('http://localhost:18000/api/save/get-all-patient');
        const patientIds = await response.json();
        const allPatients = await Promise.all(patientIds.map(({ patientId }) => fetchOnePatient(patientId)));
        setPatients(allPatients);
      } catch (error) {
        console.error('Error fetching all patients:', error);
      }
    }

    async function fetchOnePatient(id) {
      try {
        const response = await fetch(`http://localhost:18000/api/patientData/get-one-patient/${id}`);
        if (response.ok) {
          return await response.json();
        } else {
          console.error(`Error fetching patient with ID ${id}:`, await response.text());
          return null;
        }
      } catch (error) {
        console.error(`Error fetching patient with ID ${id}:`, error);
        return null;
      }
    }

    fetchAllPatients();
  }, []);


  const renderPatientName = (patient) => {
    const fullNames = patient.name.map(n => `${n.prefix[0]} ${n.given.join(' ')} ${n.family}`).join(', ');

    const age = new Date().getFullYear() - new Date(patient.birthDate).getFullYear();

    return (
      <>
          {fullNames}
          <span className="spacing"></span>
          Age: {age} yrs
          <span className="spacing"></span>
          {patient.dataName}: {patient.dataValue} {patient.unit}
      </>
    );
  };

  return (
    <div className="patient-list-content">
      {patients.map(patient => (
        <div className="patient-item" key={patient.id}>
            <div className="patient-info">
                {renderPatientName(patient)}
            </div>
            <span>ID: {patient.id}</span>
        </div>
      ))}
    </div>
  );
};


  


function AddPatientButton() {
    return <button className="add-patient-button" onClick={() => window.location.href='/FindPatient'}>+</button>;
}

function PatientList() {
    return (
        <div>
            <TopBar />
            <Sidebar />
            <h1 id="patientList">
                Patient List
            </h1>
            <AddPatientButton />
            <PatientListContent />
        </div>
    );
}

export default PatientList;

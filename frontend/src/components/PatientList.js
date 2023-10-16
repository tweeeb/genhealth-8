// src/components/PatientList.js

import React from 'react';
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

function PatientListContent() {
    return (
        <div className="patient-list">
            <div className="patient-item">
                <span className="patient-name">John Smith</span>
                <span className="patient-details">
                    <span className="patient-id">ID</span>
                    <span className="patient-age">48 yrs</span>
                </span>
            </div>
        </div>
    );
}

function AddPatientButton() {
    return <button className="add-patient-button" onClick={() => { /* function */ }}>+</button>;
}

function PatientList() {
    return (
        <div>
            <TopBar />
            <Sidebar />
            <div id="patientList">
                <h1>Patient List</h1>
            </div>
            <AddPatientButton />
            <PatientListContent />
        </div>
    );
}

export default PatientList;

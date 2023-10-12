// src/components/Landing.js
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Landing.css";
import avatar from './images/Avatar.gif';

function Landing() {
  const [doctorName, setDoctorName] = useState('XXX');
  const [LandingsidebarVisible, setLandingSidebarVisible] = useState(true);
  const [greetingPosition, setGreetingPosition] = useState('45%');

  const updateName = (name) => {
      const newName = name.trim();
      if (newName) {
          setDoctorName(newName.charAt(0).toUpperCase() + newName.slice(1));
      }
  };

  const toggleLandingSidebar = () => {
      setLandingSidebarVisible(false);
      setGreetingPosition('30%');
  };

  const expandLandingSidebar = () => {
      setLandingSidebarVisible(true);
      setGreetingPosition('45%');
  };

  return (
      <div>

          {LandingsidebarVisible ? (
              <div className="Landingsidebar">
                  <img src={avatar} alt="Doctor's Avatar" id="avatar" />
                  <ul>
                      <li><Link to="/patientList" id="profile">Patient List</Link></li>
                      <li><Link to="/profile" id="profile">Profile</Link></li>
                      <li><Link to="/aboutUs" id="aboutUs">About Us</Link></li>
                  </ul>
                  <span className="label">DIGIHEALTH</span>
                  <button id="toggleLandingSidebar" onClick={toggleLandingSidebar}></button>
              </div>
          ) : (
              <div className="blankLandingSidebar" id="blankLandingSidebar">
                  <span className="label">DIGIHEALTH</span>
                  <button id="expandLandingSidebar" onClick={expandLandingSidebar}></button>
              </div>
          )}

          <div id="greeting" style={{ left: greetingPosition }}>
              <h1>Hi, Doctor <span id="doctorName">{doctorName}</span>,</h1>
              <h1>Welcome to DIGIHEALTH</h1>

              <input type="text" id="nameInput" placeholder="Enter Doctor's Name" onChange={(e) => updateName(e.target.value)} />
              <button onClick={() => updateName(document.getElementById('nameInput').value)}>Update Name</button>
          </div>

          <button className="newTreatmentButton" onClick={() => window.location.href='newTreatment.html'}>Start New Treatment</button>

          <div id="version">
              <p>Version 1.0</p>
          </div>
      </div>
  );
}

export default Landing;
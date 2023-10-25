// src/components/Landing.js
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Landing.css";
import avatar from './images/doc-square.png';

function Landing() {
  const [doctorName, setDoctorName] = useState('Watson');
  const [LandingsidebarVisible, setLandingSidebarVisible] = useState(true);
  const [greetingPosition, setGreetingPosition] = useState('45%');

  /* Side bar */
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
                      <li><Link to="/patientList" id="LandingPatientList">Patient List</Link></li>
                      <li><Link to="/profile" id="profile">Profile</Link></li>
                      <li><Link to="/aboutUs" id="aboutUs">About Us</Link></li>
                  </ul>
                  <span className="label">SageSupport</span>
                  <button id="toggleLandingSidebar" onClick={toggleLandingSidebar}></button>
              </div>
          ) : (
              <div className="blankLandingSidebar" id="blankLandingSidebar">
                  <span className="label">SageSupport</span>
                  <button id="expandLandingSidebar" onClick={expandLandingSidebar}></button>
              </div>
          )}

          <div id="greeting" style={{ left: greetingPosition }}>
              <h1>Hi Doctor <span id="doctorName">{doctorName}</span>,</h1>
              <h1>Welcome to SageSupport</h1>
          </div>
          <button className="newTreatmentButton" onClick={() => window.location.href='/FindPatient'}>Start New Treatment</button>

          <div id="version">
              <p>Version 1.0</p>
          </div>
      </div>
  );
}

export default Landing;

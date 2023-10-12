import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "./PatientRecord.css";
import avatar from './images/Avatar.gif';

function TopBar() {
    return <div className="top-bar">DIGIHEALTH</div>;
}

function PatientRecord() {
    const [LandingsidebarVisible, setLandingSidebarVisible] = useState(false);
    const [detailPosition, setDetailPosition] = useState('20%');
    const [patientName, setPatientName] = useState("John Smith");
    let patientID = "1234ABCD";
    let patientSex = "Male";
    let patientAge = "56";

    const updateName = (name) => {
        const newName = name.trim();
        if (newName) {
            setPatientName(newName)
        }
    };

    const toggleLandingSidebar = () => {
        setLandingSidebarVisible(false);
        setDetailPosition('20%');
    };
  
    const expandLandingSidebar = () => {
        setLandingSidebarVisible(true);
        setDetailPosition('35%');
    };

    return (
        <div>
            <TopBar />
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
            <div id="patient-details" style={{ left: detailPosition }}>
                <h1><span id="patientHeader">{patientName}</span></h1>
                <h1><span id="patientDetail">ID: {patientID}</span></h1>
                <h1><span id="patientDetail">Gender: {patientSex}</span></h1>
                <h1><span id="patientDetail">Age: {patientAge}</span></h1>
                <h1><span id="patientHeader">Treatment Record</span></h1>
            </div>

        </div>
    )
 };

export default PatientRecord
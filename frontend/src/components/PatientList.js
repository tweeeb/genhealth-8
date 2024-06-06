// src/components/PatientList.js

import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './PatientList.css';
import Search from './images/search icon.png'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TopBar from './subcomponents/TopBar';

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
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function fetchAllPatients() {
      try {
        const patientIds = localStorage.getItem("patientList")
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

  console.log(patients)

  return (
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper'}} id="content">
        <List component="nav" aria-label="secondary mailbox folder">
          {patients.map((patient) => (
            <React.Fragment key={patient.id}>
              <ListItemButton component={Link} to={`/patientRecord/:${patient.id}`}>
            <ListItemText primary={(patient.name.map(n => `${n.prefix[0]} ${n.given.join(' ')} ${n.family}`).join(', ')).split(",")[0]} 
              secondary={"Age : " + (new Date().getFullYear() - new Date(patient.birthDate).getFullYear())}>
            </ListItemText>
            <Typography variant="body1" edge="end" tabIndex={-1} float="right">
                id : {patient.id}
            </Typography>
            </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </Box>
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
              <div id="box">
                <div>
                  <div id="headers">
                    <h1 id="patientList"> Patient List</h1> 
                    <IconButton id="n" component={Link} to={`/FindPatient`}>
                      <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </IconButton>
                  </div>
                  <div id="list">
                    <PatientListContent/>
                  </div>
                </div>
              </div>
        </div>
    );
}

export default PatientList;
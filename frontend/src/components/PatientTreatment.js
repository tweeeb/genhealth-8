import React, {useEffect, useState} from "react";
import { Link , useParams} from 'react-router-dom';
import "./PatientTreatment.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function TopBar() {
    return <div className="top-bar">DIGIHEALTH</div>;
}

function ProcessPatient(data) {
    let name;
    // get name
    for (let element of data.name) {
        if (element.use === "official") {
            name = element.prefix[0] + " " + element.given[0] + " " + element.family;
            break;
        }
    }
    return name;
}

function PatientInfo(id) {
    useEffect(() => {
        const fetchPatient = async() => {
            const response = await fetch(
                'https://launch.smarthealthit.org/v/r4/sim/WzQsIiIsIiIsIiIsMCwwLDAsIiIsIiIsIiIsIiIsIiIsIiIsIiIsMCwxXQ/fhir/Patient/' + id
            );
            const patient = await response.json();
            let name = ProcessPatient(patient);
            document.getElementById("title").innerText = "Here are the generated treatments for " + name;
        };
        fetchPatient();
    }, []);
}

function PatientTreatment() {

    const {id} = useParams()
    let patientID = id.substring(1 , id.length);
   
    let data = {
        "patientId": patientID
    }

    PatientInfo(patientID)
    
    useEffect (() => {
        const patientData = async () => {
            const response = await fetch ('http://localhost:18000/api/treatment/generate-treatment', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const patientJSON = await response.json();
        };
        patientData();
    });

    return (
        <div>
            <TopBar />
            <div id="data">
                <h1><span className="title" id="title"> Here are the generated treatments for </span></h1>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Select All" />
                    </FormGroup>
            </div>

        </div>
    )

}

export default PatientTreatment
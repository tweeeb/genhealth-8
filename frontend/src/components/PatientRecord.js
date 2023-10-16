import React, {useEffect, useState} from "react";
import { Link , useParams} from 'react-router-dom';
// import CollapsibleTable from "./subcomponents/CollapseTable";
import "./PatientRecord.css";

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
    // get gender
    let sex = data.gender.charAt(0).toUpperCase() + data.gender.slice(1);
    let birth = data.birthDate
    return [name, sex, birth]
}


function PatientRecord() {
    const {id} = useParams()
    let patientID = id.substring(1 , id.length);
    let patientName;
    let patientSex;
    let patientAge;

    useEffect(() => {
        const fetchPatient = async() => {
            const response = await fetch(
                'https://launch.smarthealthit.org/v/r4/sim/WzQsIiIsIiIsIiIsMCwwLDAsIiIsIiIsIiIsIiIsIiIsIiIsIiIsMCwxXQ/fhir/Patient/' + patientID
            );
            const patient = await response.json();
            let arr = ProcessPatient(patient);
            document.getElementById("pname").innerText = arr[0];
            document.getElementById("pSex").innerText = "Gender:" + " " + arr[1];
            document.getElementById("pBirth").innerText = "Birth Date:" + " " + arr[2]
        };
        fetchPatient();
    }, [patientName, patientSex, patientAge]);

    return (
        <div>
            <TopBar />
            <div id="patient-details">
                <h1><span className="patientHeader" id="pname">{patientName}</span></h1>
                <h1><span className="patientDetail" id="pID">ID: {patientID}</span></h1>
                <h1><span className="patientDetail" id="pSex">Gender: {patientSex}</span></h1>
                <h1><span className="patientDetail" id= "pBirth">Birth Date: {patientAge}</span></h1>
                <h1><span className="patientHeader">Treatment Record</span></h1>
            </div>
            <div id="treatment-history">
                
            </div>

        </div>
    )
 };

export default PatientRecord
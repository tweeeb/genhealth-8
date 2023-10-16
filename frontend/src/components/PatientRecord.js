import React, {useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import CollapsibleTable from "./subcomponents/CollapsibleTable";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./PatientRecord.css";
import IconButton from '@mui/material/IconButton';

function TopBar() {
    return <div className="top-bar">DIGIHEALTH</div>;
}

function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
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
    // get birthday
    let birth = data.birthDate
    return [name, sex, birth]
}

function PatientHistory(id) {
    useEffect(() => {
        const fetchHistory = async() => {
            const response = await fetch(
                'localhost:18000/api/save/get-treatment/' + id
            );
            const past = await response.body();
        };
        fetchHistory();
    });
}

function PatientInfo(id) {
    useEffect(() => {
        const fetchPatient = async() => {
            const response = await fetch(
                'https://launch.smarthealthit.org/v/r4/sim/WzQsIiIsIiIsIiIsMCwwLDAsIiIsIiIsIiIsIiIsIiIsIiIsIiIsMCwxXQ/fhir/Patient/' + id
            );
            const patient = await response.json();
            let arr = ProcessPatient(patient);
            document.getElementById("pname").innerText = arr[0];
            document.getElementById("pSex").innerText = "Gender:" + " " + arr[1];
            document.getElementById("pBirth").innerText = "Birth Date:" + " " + arr[2] + " (" + getAge(arr[2]) + ")"
        };
        fetchPatient();
    }, []);
}

function PatientRecord() {
    const {id} = useParams()
    let patientID = id.substring(1 , id.length);
    
    let patientName;
    let patientSex;
    let patientAge;

    PatientInfo(patientID);

    return (
        <div>
            <TopBar />
            <div id="data">
                <div>
                    <h1><span className="patientHeader" id="pname">{patientName}</span></h1>
                    <h1><span className="patientDetail" id="pID">ID: {patientID}</span></h1>
                    <h1><span className="patientDetail" id="pSex">Gender: {patientSex}</span></h1>
                    <h1><span className="patientDetail" id= "pBirth">Birth Date: {patientAge}</span></h1>
                </div>
                <div>
                    <div id="s1">
                        <h1><span className="patientHeader">Treatment Record</span></h1>
                    </div>
                    <div id="s2">
                        <IconButton id="n" component={Link} to={`/patientTreatment/:${patientID}'`}>
                            <AddCircleOutlineIcon></AddCircleOutlineIcon>
                        </IconButton>
                    </div>
                </div>
                <CollapsibleTable> </CollapsibleTable>
            </div>

        </div>
    )
 };

export default PatientRecord
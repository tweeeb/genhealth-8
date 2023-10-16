import React, {useEffect, useState} from "react";
import { Link , useParams} from 'react-router-dom';
// import CollapsibleTable from "./subcomponents/CollapseTable";
import "./PatientTreatment.css";

function TopBar() {
    return <div className="top-bar">DIGIHEALTH</div>;
}

function seperateData(data) {
    data.forEach(treatment => {
        treatment.forEach(element => {
            console.log(element)
        })
    });
}

function PatientTreatment() {
    let data = {
        "patientId": "d64b37f5-d3b5-4c25-abe8-23ebe8f5a04e"
    }
    
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
            seperateData(patientJSON.predictions)
        };
        patientData();
    })

}
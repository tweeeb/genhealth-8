import React, {useEffect, useState} from "react";
import { Link , useParams} from 'react-router-dom';
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

    const {id} = useParams()
    let patientID = id.substring(1 , id.length);
   
    let data = {
        "patientId": patientID
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
    });

    return (
        <div>
            <TopBar />

        </div>
    )

}

export default PatientTreatment
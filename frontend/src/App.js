import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState} from 'react';
import Landing from './components/Landing';
import PatientList from './components/PatientList';
import PatientRecord from './components/PatientRecord';
import PatientTreatment from './components/PatientTreatment';
import FindPatient from './components/FindPatient';
import DiscardTreatment from './components/DiscardTreatment';

function App() {
    const [patients, setPatients] = useState([]);
    const [treatments, setTreatments] = useState({});

    return (
        <Router>
            <Routes>
               <Route path="/" element={<Landing />} />
               <Route path="/patientList" element={<PatientList patients={patients}/>} />
               <Route path="/patientRecord/:id" element={<PatientRecord treatments={treatments} />} />
               <Route path="/patientTreatment/:id" element={<PatientTreatment/>} />
               <Route path="/FindPatient" element={<FindPatient setpatients={setPatients}/>} />
               <Route path="/discardTreatment/:id/:vals" element={<DiscardTreatment settreatments={setTreatments} />} />
            </Routes>
        </Router>
    );
}

export default App;

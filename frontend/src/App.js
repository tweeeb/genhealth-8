import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import PatientList from './components/PatientList';
import PatientRecord from './components/PatientRecord';
import FindPatient from './components/FindPatient';

function App() {
    return (
        <Router>
            <Routes>
               <Route path="/" element={<Landing />} />
               <Route path="/patientList" element={<PatientList />} />
               <Route path="/patientRecord/:id" element={<PatientRecord/>} />
               <Route path="/FindPatient" element={<FindPatient />} />
            </Routes>
        </Router>
    );
}

export default App;

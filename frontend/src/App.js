import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import PatientList from './components/PatientList';
import FindPatient from './components/FindPatient';

function App() {
    return (
        <Router>
            <Routes>
               <Route path="/" element={<Landing />} />
               <Route path="/patientList" element={<PatientList />} />
               <Route path="/FindPatient" element={<FindPatient />} />
            </Routes>
        </Router>
    );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import PatientList from './components/PatientList';

function App() {
    return (
        <Router>
            <Routes>
               <Route path="/" element={<Landing />} />
               <Route path="/patientList" element={<PatientList />} />
            </Routes>
        </Router>
    );
}

export default App;

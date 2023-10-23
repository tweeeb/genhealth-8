import React, {useEffect, useState} from "react";
import { Link , useParams} from 'react-router-dom';
import "./PatientTreatment.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

function TopBar() {
    return <div className="top-bar" onClick={() => window.location.href='/'}>DIGIHEALTH</div>;
}

function Treatment(num, val) {
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    return (
        <Box>
            <div id="treatment">
                <h1 id="treatment-header">
                    Reason for discarding treatment {num}
                </h1>
            </div>
            <FormControl fullWidth>
            <TextField id="outlined-basic" label="Rationale" variant="outlined" multiline/>
            </FormControl>
        </Box>
    );
}

function DiscardTreatment() {
    const {id} = useParams()
    let patientID = id.substring(1 , id.length);
    return (
        <div>
            <TopBar />
            <div id="data">
                <h1><span className="title" id="title">To improve our service, please tell us the reasons for discarding these treatments?</span></h1>
                <h1 id="discard-header">
                    Discarded treatments:
                </h1>
                <h2 id="discard-info">
                    Treatment 1, Treatment 2, Treatment 3
                </h2>
                <div>
                    {Treatment(1)}
                    {Treatment(2)}
                    {Treatment(3)}
                </div>
                <Button id="fixed-button"  size="large" component={Link} to={`/patientRecord/:${patientID}`} variant="contained">Save</Button>
            </div>

        </div>
    )

}

export default DiscardTreatment
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
    return <div className="top-bar">DIGIHEALTH</div>;
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
                    Treatment {num}
                </h1>
                <Checkbox id="treatment-select" defaultChecked checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>
            </div>
            <FormControl fullWidth>
            <TextField id="outlined-basic" label="GenHealth Treatment" variant="outlined" multiline 
            defaultValue={val}/>
            </FormControl>
        </Box>
    );
}

function ProcessPatient(data) {
    let name;
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
    const [treatments, setTreatments] = useState([]);

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
            const treats = await response.json();
            setTreatments(treats)
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
                <div>
                    {Treatment(1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Enim ut sem viverra aliquet eget sit. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Elit ut aliquam purus sit amet. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Non pulvinar neque laoreet suspendisse interdum consectetur. Varius duis at consectetur lorem. Sit amet cursus sit amet dictum sit. Est pellentesque elit ullamcorper dignissim. Pretium quam vulputate dignissim suspendisse in est. Id volutpat lacus laoreet non. Faucibus nisl tincidunt eget nullam non nisi. Facilisis gravida neque convallis a cras semper auctor neque vitae. Eu scelerisque felis imperdiet proin fermentum leo. Tristique nulla aliquet enim tortor at auctor. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Amet commodo nulla facilisi nullam vehicula.")}
                    {Treatment(2, "Eu mi bibendum neque egestas congue quisque egestas diam in. Gravida in fermentum et sollicitudin ac. Bibendum est ultricies integer quis auctor elit. Sed felis eget velit aliquet sagittis id consectetur purus. Pharetra sit amet aliquam id diam maecenas. Urna id volutpat lacus laoreet non curabitur gravida. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Blandit cursus risus at ultrices. Sit amet volutpat consequat mauris nunc congue. Urna cursus eget nunc scelerisque viverra mauris in aliquam.")}
                    {Treatment(3, "Cursus in hac habitasse platea dictumst quisque. Condimentum mattis pellentesque id nibh tortor id. Molestie at elementum eu facilisis sed odio morbi. Egestas diam in arcu cursus euismod quis viverra. Amet cursus sit amet dictum. Quis vel eros donec ac. Id leo in vitae turpis. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Arcu felis bibendum ut tristique et egestas quis ipsum. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Netus et malesuada fames ac turpis egestas. Tortor posuere ac ut consequat semper viverra nam libero justo. Porttitor lacus luctus accumsan tortor. Gravida arcu ac tortor dignissim convallis. Odio eu feugiat pretium nibh ipsum consequat. Lobortis elementum nibh tellus molestie nunc. Amet mattis vulputate enim nulla. Donec enim diam vulputate ut pharetra sit. Tristique magna sit amet purus.")}
                </div>
                <Button id="fixed-button"  size="large" component={Link} to={`/DiscardTreatment/:${patientID}`} variant="contained">Next</Button>
            </div>

        </div>
    )

}

export default PatientTreatment
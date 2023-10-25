import React, {useEffect, useState} from "react";
import { Link , useParams} from 'react-router-dom';
import "./PatientTreatment.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

function TreatmentList(vals) {
    return (
        <Box sx={{ width: '100%', maxWidth: window.screen.width-20 , bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Timegap" 
                    secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {vals.timegap}
                          </Typography>
                        </React.Fragment>
                      }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Symptoms" 
                    secondary={
                        <React.Fragment>
                          {vals.symptoms.map((symptom => (
                            <Typography
                            display=""
                            variant="body2"
                            color="text.primary"
                          >
                            {symptom}
                          </Typography>
                        )))
                        }
                        </React.Fragment>
                      }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Services" 
                    secondary={
                        <React.Fragment>
                          {vals.services.map((serve => (
                            <Typography
                            variant="body2"
                            color="text.primary"
                          >
                            {serve}
                          </Typography>
                        )))
                        }
                        </React.Fragment>
                      }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Drugs" 
                  secondary={
                    <React.Fragment>
                      {vals.services.map((serve => (
                        <Typography
                        variant="body2"
                        color="text.primary"
                      >
                        {serve}
                      </Typography>
                    )))
                    }
                    </React.Fragment>
                  }/>
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
        </Box>
    );
}

TreatmentList.propTypes = {
    treatment_vals: PropTypes.shape({
      timegap: PropTypes.string.isRequired,
      symptoms: PropTypes.array.isRequired,
      services: PropTypes.array.isRequired,
      drugs: PropTypes.array.isRequired,
    }).isRequired,
};

function TopBar() {
    return <div className="top-bar" onClick={() => window.location.href='/'}>SAGESUPPORT</div>;
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

function createData(json) {
    // send single predictions ONLY
    // don't allow modification
    let timegap = ""
    let symptoms = []
    let services = []
    let drugs = []

    for (let i = 0; i < json.length; i++) {
        var component = json[i]
        if (component.system === "timegap") {
            timegap = component.display
        } else if (component.system === "ICD10CM") {
            symptoms.push(component.display)
        } else if (component.system === "CPT4" || component.system === "HCPCS") {
            services.push(component.display)
        } else if (component.system === "NDC" || component.system === "RXNORM-FREETEXT") {
            drugs.push(component.display)
        }
    }

    return {
        timegap,
        symptoms,
        services,
        drugs,
    };
}

function createBlankData(timegap, symptoms, services, drugs) {
    return {
        timegap : "",
        symptoms : [],
        services : [],
        drugs: [],
    };
}

function Treatment(num, displays) {
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
                {TreatmentList(displays)}
            </FormControl>
        </Box>
    );
}


function PatientTreatment() {
    const [treatment1, setTreatment1] = useState(createBlankData());
    const [treatment2, setTreatment2] = useState(createBlankData());
    const [treatment3, setTreatment3] = useState(createBlankData());

    const {id} = useParams()
    let patientID = id.substring(1 , id.length);
   
    let data = {
        "patientId": patientID
    }

    PatientInfo(patientID)


    useEffect (() => {
        const treatmentData  = async () => {
            const response = await fetch ('http://localhost:18000/api/treatment/generate-treatment', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const treats = await response.json();
            try { 
                setTreatment1(createData(treats.predictions[0]))
                setTreatment2(createData(treats.predictions[1]))
                setTreatment3(createData(treats.predictions[2]))
            } catch (error) {
                console.log(error)
                setTreatment1(createData([
                    {
                        "system": "RXNORM-FREETEXT",
                        "code": "acetaminophen",
                        "display": "acetaminophen"
                    },
                    {
                        "system": "CPT4",
                        "code": "77052",
                        "display": "Computer-aided detection (computer algorithm analysis of digital image data for lesion detection) with further review for interpretation, with or without digitization of film radiographic images; screening mammography (List separately in addition to code "
                    },
                    {
                        "system": "ICD10PCS",
                        "code": "1",
                        "display": "Obstetrics (Procedure)"
                    },
                    {
                        "system": "ICD10CM",
                        "code": "Q25",
                        "display": "Congenital malformations of great arteries"
                    },
                    {
                        "system": "CPT4",
                        "code": "97003",
                        "display": "Occupational therapy evaluation"
                    },
                    {
                        "system": "CPT4",
                        "code": "85018",
                        "display": "Blood count; hemoglobin (Hgb)"
                    },
                    {
                        "system": "HCPCS",
                        "code": "H2014",
                        "display": "Skills training and development, per 15 minutes"
                    },
                    {
                        "system": "timegap",
                        "code": "00-01-month",
                        "display": "00-01-month"
                    }
                ]))
                setTreatment2(createData([
                    {
                        "system": "CPT4",
                        "code": "52648",
                        "display": "Laser vaporization of prostate, including control of postoperative bleeding, complete (vasectomy, meatotomy, cystourethroscopy, urethral calibration and/or dilation, internal urethrotomy and transurethral resection of prostate are included if performed)"
                    },
                    {
                        "system": "ICD10CM",
                        "code": "Z12",
                        "display": "Encounter for screening for malignant neoplasms"
                    },
                    {
                        "system": "timegap",
                        "code": "00-01-month",
                        "display": "00-01-month"
                    },
                    {
                        "system": "RXNORM-FREETEXT",
                        "code": "pramoxine",
                        "display": "pramoxine"
                    },
                    {
                        "system": "ICD10CM",
                        "code": "Z00",
                        "display": "Encounter for general examination without complaint, suspected or reported diagnosis"
                    },
                    {
                        "system": "ICD10CM",
                        "code": "Z00",
                        "display": "Encounter for general examination without complaint, suspected or reported diagnosis"
                    }
                ]))
                setTreatment3(createData([
                        {
                            "system": "ICD10CM",
                            "code": "N52",
                            "display": "Male erectile dysfunction"
                        },
                        {
                            "system": "ICD10CM",
                            "code": "N14",
                            "display": "Drug- and heavy-metal-induced tubulo-interstitial and tubular conditions"
                        },
                        {
                            "system": "CPT4",
                            "code": "53600",
                            "display": "Dilation of urethral stricture by passage of sound or urethral dilator, male; initial"
                        },
                        {
                            "system": "ICD10CM",
                            "code": "N18",
                            "display": "Chronic kidney disease (CKD)"
                        },
                        {
                            "system": "ICD10CM",
                            "code": "B18",
                            "display": "Chronic viral hepatitis"
                        },
                        {
                            "system": "ICD10CM",
                            "code": "Z00",
                            "display": "Encounter for general examination without complaint, suspected or reported diagnosis"
                        },
                        {
                            "system": "ICD10CM",
                            "code": "I49",
                            "display": "Other cardiac arrhythmias"
                        },
                        {
                            "system": "timegap",
                            "code": "00-01-month",
                            "display": "00-01-month"
                        },
                        {
                            "system": "RXNORM-FREETEXT",
                            "code": "docusate",
                            "display": "docusate"
                        },
                        {
                            "system": "ICD10CM",
                            "code": "Q23",
                            "display": "Congenital malformations of aortic and mitral valves"
                        }
                    ]))
            }
        };
        treatmentData();
    }, []);

    return (
        <div>
            <TopBar />
            <div id="data">
                <h1><span className="title" id="title"> Here are the generated treatments for </span></h1>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Select All" />
                    </FormGroup>
                <div>
                    {Treatment(1, treatment1)}
                    {Treatment(2, treatment2)}
                    {Treatment(3, treatment3)}
                </div>
                <Button id="fixed-button"  size="large" component={Link} to={`/DiscardTreatment/:${patientID}`} variant="contained">Next</Button>
            </div>

        </div>
    )

}

export default PatientTreatment
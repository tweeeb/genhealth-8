import React, {useEffect, useState} from "react";
import { useParams} from 'react-router-dom';
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
                      {vals.drugs.map((drug => (
                        <Typography
                        variant="body2"
                        color="text.primary"
                      >
                        {drug}
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
        } else if (component.system === "CPT4" || component.system === "HCPCS" || component.system === "ICD10PCS") {
            services.push(component.display)
        } else if (component.system === "NDC" || component.system === "RXNORM-FREETEXT") {
            let string = component.display
            drugs.push(string.charAt(0).toUpperCase() + string.slice(1))
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

function checkChecks(id, t1, t2, t3) {
    let save1 = document.getElementById("checksel1").getAttribute("checked")
    let save2 = document.getElementById("checksel2").getAttribute("checked")
    let save3 = document.getElementById("checksel3").getAttribute("checked")

    const saveTreatment = async(bodyText) => {
        const response = await fetch("localhost:18000/api/save/save-treatment",{
            method: 'POST',
            body: bodyText,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const reply = await response.json();
    }

    const redirect = (string) => {
        window.location.href = `/discardTreatment/:${id}/:${string}`
     }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd +  "-" + mm + "-" + yyyy

    let preds = []
    let disc = ""

    if (save1 === "true" || save1 === "") {
        preds.push(t1)
    } else {
        disc = disc + "1"
    }
    if (save2 === "true" || save2 === "") {
        preds.push(t2)
    } else {
        disc = disc + "2"
    }
    if (save3 === "true" || save3 === "") {
        preds.push(t3)
    } else {
        disc = disc + "3"
    }

    let body = {
        "patientID" : id,
        "date" : today,
        "predictions" : preds,
    }

    saveTreatment(body)
    redirect(disc)
}

function Treatment(num, displays) {
    let checkname = "checksel" + num
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
      setChecked(event.target.checked);
      document.getElementById(checkname).setAttribute("checked", !checked)
    };

    return (
        <Box>
            <div id="treatment">
                <h1 id="treatment-header">
                    Treatment {num}
                </h1>
                <Checkbox id={checkname} checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }}/>
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
    const [selection, setSelection] = React.useState(true);

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
                setTreatment1(treats.predictions[0])
                setTreatment2(treats.predictions[1])
                setTreatment3(treats.predictions[2])
            } catch (error) {
                console.log(error)
                setTreatment1([
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
                ])
                setTreatment2([
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
                ])
                setTreatment3([
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
                ])
            }
        };
        treatmentData();
    }, []);

    const handleChange = (event) => {
        setSelection(event.target.checked);
    };

    let t1 = createData(treatment1)
    let t2 = createData(treatment2)
    let t3 = createData(treatment3)


    return (
        <div>
            <TopBar />
            <div id="data">
                <h1><span className="title" id="title"> Here are the generated treatments for </span></h1>
                <div>
                    {Treatment(1, t1)}
                    {Treatment(2, t2)}
                    {Treatment(3, t3)}
                </div>
                <Button id="fixed-button"  size="large" onClick={(e) => checkChecks(patientID, treatment1, treatment1, treatment3)} variant="contained">Next</Button>
                {/* <Button id="fixed-button"  size="large" onClick={(e) => checkChecks(patientID, treatment1, treatment1, treatment3)} component={Link} to={`/DiscardTreatment/:${patientID}`} variant="contained">Next</Button> */}
            </div>

        </div>
    )

}

export default PatientTreatment
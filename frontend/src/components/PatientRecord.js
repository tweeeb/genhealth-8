import React, {useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import CollapsibleTable from "./subcomponents/CollapsibleTable";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./PatientRecord.css";
import IconButton from '@mui/material/IconButton';
import StatusList from "./subcomponents/StatusList";

function TopBar() {
    return <div className="top-bar" onClick={() => window.location.href='/'}>SAGESUPPORT</div>;
}

function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

function ProcessPatient(data) {
    let name;
    // get name
    for (let element of data.name) {
        if (element.use === "official") {
            name = element.prefix[0] + " " + element.given[0] + " " + element.family;
            break;
        }
    }
    // get gender
    let sex = data.gender.charAt(0).toUpperCase() + data.gender.slice(1);
    // get birthday
    let birth = data.birthDate
    return [name, sex, birth]
}

function PatientInfo(id) {
    useEffect(() => {
        const fetchPatient = async() => {
            const response = await fetch(
                'https://launch.smarthealthit.org/v/r4/sim/WzQsIiIsIiIsIiIsMCwwLDAsIiIsIiIsIiIsIiIsIiIsIiIsIiIsMCwxXQ/fhir/Patient/' + id
            );
            const patient = await response.json();
            let arr = ProcessPatient(patient);
            document.getElementById("pname").innerText = arr[0];
            document.getElementById("pSex").innerText = "Gender:" + " " + arr[1];
            document.getElementById("pBirth").innerText = "Birth Date:" + " " + arr[2] + " (" + getAge(arr[2]) + ")"
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

function GetPatientCondition(id) {
    const [conditions, setConditions] = React.useState([]);

    useEffect(() => {
        const getCondition = async(id) => {
            const response = await fetch(`https://launch.smarthealthit.org/v/r4/fhir/Condition?patient=${id}`);
            const reply = await response.json();
            setConditions(CreateConditionData(reply.entry))
        };
        getCondition(id);
    }, []);
    return conditions
}

function CreateConditionData(entry) {
    let conds = []
    for (let i = 0; i < entry.length; i++){
        var condition = entry[i].resource
        conds.push({
            date: condition.recordedDate.slice(0,9),
            display: condition.code.text,
            class: "Conditions",
            status: condition.clinicalStatus.coding[0].code
        })
    }
    return conds

}

function GetPatientMedications(id) {
    const [medications, setMeds] = React.useState([]);

    useEffect(() => {
        const getMedications = async(id) => {
            const response = await fetch(`http://localhost:18000/api/patientData/medication/${id}`);
            const reply = await response.json();
            setMeds(CreateMedicationData(reply.entry))
        };
        getMedications(id);
    }, []);
    return medications
}

function CreateMedicationData(entry) {
    let meds = []
    for (let i = 0; i < entry.length; i++){
        var medentry = entry[i].resource
        meds.push({
            date: medentry.authoredOn.slice(0,9), 
            display: medentry.medicationCodeableConcept.text,
            class: "Medications",
            status: medentry.status
        })
    }
    return meds
}

function GetPatientLabs(id) {
    const [labs, setLabs] = React.useState([]);

    useEffect(() => {
        const getLabs = async(id) => {
            const response = await fetch(`http://localhost:18000/api/patientData/test-result/${id}`);
            const reply = await response.json();
            setLabs(CreateLabData(reply.entry))
        };
        getLabs(id);
    }, []);
    return labs
}

function CreateLabData(entry) {
    let labs = []
    for (let i = 0; i < entry.length; i++){
        var labresults = entry[i].resource
        labs.push({
            date: labresults.effectiveDateTime.slice(0,9), 
            display: labresults.code.text,
            class: "Labs",
            status: labresults.status
        })
    }
    return labs

}


function PatientHistory(patientID) {
    const [history, setHistory] = React.useState([]);

    const getHistory = async(id) => {
        const response = await fetch(`localhost:18000/api/save/get-treatment/${id}`);
        const reply = await response.json();
        setHistory(reply)
    }
    
    getHistory(patientID)
}


function PatientRecord() {
    const {id} = useParams()
    let patientID = id.substring(1 , id.length);
    let patientName;
    let patientSex;
    let patientAge;

    (function(){
        if (typeof Object.defineProperty === 'function'){
          try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
        }
        if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;
      
        function sb(f){
          for (var i=this.length;i;){
            var o = this[--i];
            this[i] = [].concat(f.call(o,o,i),o);
          }
          this.sort(function(a,b){
            for (var i=0,len=a.length;i<len;++i){
              if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
            }
            return 0;
          });
          for (var i=this.length;i;){
            this[--i]=this[i][this[i].length-1];
          }
          return this;
        }
      })();

    PatientInfo(patientID);
    // PatientHistory(patientID);
    let conds = GetPatientCondition(patientID).sortBy(function(o){ return o.date }).reverse();
    let meds = GetPatientMedications(patientID).sortBy(function(o){ return o.date }).reverse();
    let labs = GetPatientLabs(patientID).sortBy(function(o){ return o.date }).reverse();

    return (
        <div>
            <TopBar />
            <div id="data">
                <div>
                    <h1><span className="patientHeader" id="pname">{patientName}</span></h1>
                    <h1><span className="patientDetail" id="pID">ID: {patientID}</span></h1>
                    <h1><span className="patientDetail" id="pSex">Gender: {patientSex}</span></h1>
                    <h1><span className="patientDetail" id= "pBirth">Birth Date: {patientAge}</span></h1>
                </div>
                <div>
                    <div id="s1">
                        <h1><span className="patientHeader">Sage Support Care Plan</span></h1>
                    </div>
                    <div id="s2">
                        <IconButton id="n" component={Link} to={`/patientTreatment/:${patientID}`}>
                            <AddCircleOutlineIcon></AddCircleOutlineIcon>
                        </IconButton>
                    </div>
                </div>
                <CollapsibleTable> </CollapsibleTable>
                <div>
                    <h1><span className="patientHeader">Patient History</span></h1>
                    <h1><span className="patientSub">Conditions</span></h1>
                    {StatusList(conds)}

                    <h1><span className="patientSub">Medications</span></h1>
                    {StatusList(meds)}

                    <h1><span className="patientSub">Lab Results</span></h1>
                    {StatusList(labs)}
                </div>
            </div>

        </div>
    )
 };

export default PatientRecord
package com.comp.backendproject.service.Imp;

import com.comp.backendproject.constant.DataSource;
import com.comp.backendproject.entity.Patient;
import com.comp.backendproject.entity.PatientEntity;
import com.comp.backendproject.entity.PatientRespoen;
import com.comp.backendproject.service.PatientDataService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.*;

@Service
@Slf4j
public class PatientDataServiceImp implements PatientDataService {

    private final RestTemplate restTemplate;

    private static final Logger logger = LoggerFactory.getLogger(PatientDataServiceImp.class);

    private List<Patient> patientData;


    @Autowired
    public PatientDataServiceImp(@Qualifier("restRequest") RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        patientData = new ArrayList<>();
    }

    @Override
    public Object getPatientData() {
        String url = "https://launch.smarthealthit.org/v/r4/sim/...../fhir/Patient";
        ResponseEntity<PatientRespoen> responseEntity = restTemplate.getForEntity(url, PatientRespoen.class);
        PatientRespoen responseBody = responseEntity.getBody();
        logger.info("responseBody: {}", responseBody.getEntry());



        return responseBody.getEntry();
    }

    @Override
    public Object getOnePatientData(String id) {
        String url = DataSource.FHIR_URL + "/Patient/" + id;
        ResponseEntity<PatientEntity> responseEntity = restTemplate.getForEntity(url, PatientEntity.class);
        PatientEntity responseBody = responseEntity.getBody();
        return responseBody;
    }

    @Override
    public Object getConditionData(String id) {
        String url = DataSource.FHIR_URL + "/Condition?patient=" + id;
        ResponseEntity<Object> responseEntity = restTemplate.getForEntity(url, Object.class);
        Object responseBody = responseEntity.getBody();
        return responseBody;
    }

    @Override
    public Object getMedicationsData(String id) {
        String url = DataSource.FHIR_URL + "/MedicationRequest?patient=" + id;
        ResponseEntity<Object> responseEntity = restTemplate.getForEntity(url,Object.class);
        Object responseBody = responseEntity.getBody();
        return responseBody;

    }

    @Override
    public Object getLaboratoryTests(String id) {
        String url = DataSource.FHIR_URL + "/DiagnosticReport?patient=" + id;
        ResponseEntity<Object> responseEntity = restTemplate.getForEntity(url, Object.class);
        Object responseBody = responseEntity.getBody();
        return responseBody;
    }
}

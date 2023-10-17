package com.comp.backendproject.service.Imp;

import com.comp.backendproject.constant.DataSource;
import com.comp.backendproject.entity.Encounter.*;
import com.comp.backendproject.entity.Genhealth.ApiRespone;
import com.comp.backendproject.entity.Patient;
import com.comp.backendproject.service.GenhealthApiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.util.*;
@Service
public class GenHealthApiServiceImp implements GenhealthApiService {
    private final RestTemplate restTemplate;

    private Logger logger = LoggerFactory.getLogger(GenHealthApiServiceImp.class);

    @Autowired
    public GenHealthApiServiceImp(@Qualifier("restRequest") RestTemplate restTemplate) {
         this.restTemplate = restTemplate;
    }
    @Override
    public Object getPridiction(List<Coding> codes) {
        // Set the headers
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("Authorization", "Token gh_s_k-NTBjODUyODItOTIzOC00OGU0LWIwMDUtMWE0MzhjODY0OWY0");
        // Create the request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("history", codes);

        requestBody.put("num_predictions", 3);
        requestBody.put("generation_length", 10);
        requestBody.put("inference_threshold", 0.95);
        requestBody.put("inference_temperature", 0.95);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        // Make the POST request
        ResponseEntity<ApiRespone> response = restTemplate.exchange("https://api.genhealth.ai/predict", HttpMethod.POST, entity, ApiRespone.class);
        logger.info("response: {}", response.getBody());

        // Print the response
        return response.getBody();

    }

    @Override
    public List<Coding> getEncounterByPatientId(String patientId) {
        String ENCOUNTER_URL = DataSource.FHIR_URL + "/Encounter?patient=" + patientId;
        List<Coding> codes = new ArrayList<>();
        try {
            ResponseEntity<EncounterRespone> responseEntity = restTemplate.getForEntity(ENCOUNTER_URL, EncounterRespone.class);
            EncounterRespone responseBody = responseEntity.getBody();

            List<EntryObject> entryObject = responseBody.getEntry();
            for (EntryObject entry : entryObject) {
                EncounterResource encounter = entry.getResource();
                if (encounter.getSubject() == null) {
                    continue;
                }
                String subjectReference = encounter.getSubject().getReference();
                logger.info("subjectReference: {}", subjectReference);

                if (subjectReference.endsWith(patientId)) {
                    logger.info("find match");
                    for (EncounterType type: encounter.getType()) {
                        for (Coding coding : type.getCoding()) {
                            codes.add(coding);
                        }
                    }
                }
            }
            logger.info("response: {}", responseEntity.getBody());
            logger.info("codes: {}", codes);
            return codes;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Object getConditionByPatientId(String patientId) {
        return null;
    }
}

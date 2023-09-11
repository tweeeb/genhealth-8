package com.comp.backendproject.service.Imp;

import com.comp.backendproject.service.PatientDataService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class PatientDataServiceImp implements PatientDataService {
    private final RestTemplate restTemplate;

    private static final Logger logger = LoggerFactory.getLogger(PatientDataServiceImp.class);


    @Autowired
    public PatientDataServiceImp(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;

        logger.error("PatientDataServiceImp(RestTemplate restTemplate) is called");
        logger.debug(restTemplate.toString());
    }
    @Override
    public Object getPatientData() {
        return null;
    }
}

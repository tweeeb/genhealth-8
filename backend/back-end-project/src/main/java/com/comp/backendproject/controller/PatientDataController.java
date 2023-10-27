package com.comp.backendproject.controller;


import com.comp.backendproject.service.PatientDataService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@CrossOrigin
@RequestMapping("/api/patientData")
@RestController
public class PatientDataController {
    @Resource
    PatientDataService patientDataService;


    @GetMapping("/get")
    public Object getPatientData() {
        return patientDataService.getPatientData();
    }

    @GetMapping("/get-one-patient/{id}")
    public Object getOnePatientData(@PathVariable String id) {

        return patientDataService.getOnePatientData(id);
    }

    @GetMapping("/condition/{id}")
    public Object getConditionData(@PathVariable String id) {

        return patientDataService.getConditionData(id);
    }

    @GetMapping("/medication/{id}")
    public Object getMedicationData(@PathVariable String id) {

        return patientDataService.getMedicationsData(id);
    }

    @GetMapping("/test-result/{id}")
    public Object getTestResultData(@PathVariable String id) {

        return patientDataService.getLaboratoryTests(id);
    }

}

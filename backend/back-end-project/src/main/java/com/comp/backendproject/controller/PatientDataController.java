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

}

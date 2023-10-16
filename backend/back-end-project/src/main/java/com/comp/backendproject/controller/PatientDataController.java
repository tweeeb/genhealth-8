package com.comp.backendproject.controller;


import com.comp.backendproject.service.PatientDataService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}

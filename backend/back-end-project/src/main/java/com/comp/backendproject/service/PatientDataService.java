package com.comp.backendproject.service;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public interface PatientDataService {

    @Resource
    Object getPatientData();

    @Resource
    Object getOnePatientData(String id);
}

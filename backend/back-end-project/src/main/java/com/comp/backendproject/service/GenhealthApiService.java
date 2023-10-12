package com.comp.backendproject.service;

import com.comp.backendproject.entity.Encounter.Coding;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public interface GenhealthApiService {

    @Resource
    Object getPridiction(List<Coding> codes);

    @Resource
    List<Coding> getEncounterByPatientId(String patientId);

    @Resource
    Object getConditionByPatientId(String patientId);

}

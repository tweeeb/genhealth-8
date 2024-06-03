package com.comp.backendproject.controller;

import com.comp.backendproject.dao.PatientRepository;
import com.comp.backendproject.dao.PredictionRepository;
import com.comp.backendproject.entity.save.patient.SavePatient;
import com.comp.backendproject.entity.save.prediction.Prediction;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@CrossOrigin
@RestController
@RequestMapping("/api/save")
public class SaveTreatmentAndPatientController {
    private static final Logger logger = LoggerFactory.getLogger(SaveTreatmentAndPatientController.class);

    @Resource
    PredictionRepository predictionRepository;

    @Resource
    PatientRepository patientRepository;

    @PostMapping("/save-treatment")
    public Prediction createNewPrediction(@RequestBody Prediction param) {
        logger.info("save treatment");
        logger.info("parm{} ",param.toString());
        return predictionRepository.save(param);
    }

    @GetMapping("/get-treatment/{id}")
    public List<Prediction> getUserById(@PathVariable String id) {
        return predictionRepository.findByPatientId(id);
    }

    @PostMapping("/save-patient")
    public SavePatient createPatient(@RequestBody SavePatient param) {
        return patientRepository.save(param);
    }

    @GetMapping("/get-all-patient")
    public List<SavePatient> getAllPatient() {
        return patientRepository.findAll();
    }
}

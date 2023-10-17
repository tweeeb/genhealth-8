package com.comp.backendproject.dao;

import com.comp.backendproject.entity.save.prediction.Prediction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredictionRepository extends MongoRepository<Prediction, String> {
    List<Prediction> findByPatientId(String patientId);
}

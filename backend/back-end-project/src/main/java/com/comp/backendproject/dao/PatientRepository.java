package com.comp.backendproject.dao;

import com.comp.backendproject.entity.Patient;
import com.comp.backendproject.entity.save.patient.SavePatient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends MongoRepository<SavePatient, String> {

}

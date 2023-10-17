package com.comp.backendproject.entity.save.patient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "patient")
public class SavePatient {

    @Id
    @JsonIgnore
    private String id;

    private String patientId;
}

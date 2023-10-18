package com.comp.backendproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public
class PatientEntity {
    private String id;

    private List<PatienName> name;

    private Date birthDate;

    private String gender;
}

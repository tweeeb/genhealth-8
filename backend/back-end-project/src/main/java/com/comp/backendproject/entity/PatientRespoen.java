package com.comp.backendproject.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PatientRespoen {
    private List<PatientResource> entry;


}


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
class PatientResource {
    private PatientEntity resource;


}
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
class PatientEntity{
    private String id;

    private List<PatienName> name;

    private Date birthDate;

    private String gender;
}

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
class PatienName{
    private String family;

    private List<String> given;

    private List<String> prefix;
}
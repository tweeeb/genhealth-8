package com.comp.backendproject.entity.observation;

import com.comp.backendproject.entity.Encounter.Subject;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

// Resource.java
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Resource {
    private Code code;
    private ValueQuantity valueQuantity;
    private Subject subject;



}

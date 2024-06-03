package com.comp.backendproject.entity.observation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

// Code.java
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Code {
    private String text;

}

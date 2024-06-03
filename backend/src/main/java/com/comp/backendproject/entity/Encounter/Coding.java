package com.comp.backendproject.entity.Encounter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Coding {
    private String system;
    private String code;
    private String display;

}

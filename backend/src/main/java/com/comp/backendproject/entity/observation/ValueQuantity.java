package com.comp.backendproject.entity.observation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ValueQuantity {
    private Double value;
    private String unit;

}

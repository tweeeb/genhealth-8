package com.comp.backendproject.entity.observation;

import com.comp.backendproject.entity.observation.Entry;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

// ObservationResponse.java
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ObservationResponse {
    private List<Entry> entry;

}

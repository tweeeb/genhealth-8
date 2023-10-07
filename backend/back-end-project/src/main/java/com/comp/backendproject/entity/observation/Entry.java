package com.comp.backendproject.entity.observation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

// Entry.java
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Entry {
    private Resource resource;

}

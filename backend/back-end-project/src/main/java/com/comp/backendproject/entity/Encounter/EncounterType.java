package com.comp.backendproject.entity.Encounter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class EncounterType {
    private List<Coding> coding;
}

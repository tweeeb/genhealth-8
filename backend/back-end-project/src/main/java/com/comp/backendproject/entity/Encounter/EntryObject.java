package com.comp.backendproject.entity.Encounter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class EntryObject {
    private EncounterResource resource;
}

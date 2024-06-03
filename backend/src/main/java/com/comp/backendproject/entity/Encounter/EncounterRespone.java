package com.comp.backendproject.entity.Encounter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class EncounterRespone {

    private List<EntryObject> entry;
}

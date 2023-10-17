package com.comp.backendproject.entity.Genhealth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Prediction {

    List<Compoent> prediction;
}

package com.comp.backendproject.controller;

import com.comp.backendproject.controller.param.GetPredictionRequest;
import com.comp.backendproject.entity.Encounter.Coding;
import com.comp.backendproject.service.GenhealthApiService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@CrossOrigin
@RequestMapping("/api/treatment")
@RestController
public class GenhealthController {

    @Resource
    GenhealthApiService genhealthApiService;

    @PostMapping("/generate-treatment")
    public Object generateTreatment(@RequestBody GetPredictionRequest request) {
        List<Coding> codes = genhealthApiService.getEncounterByPatientId(request.getPatientId());
        return genhealthApiService.getPridiction(codes);

    }
}

package com.comp.backendproject.service.Imp;

import com.comp.backendproject.entity.observation.Entry;
import com.comp.backendproject.entity.observation.ObservationResponse;

import com.comp.backendproject.entity.observation.ValueQuantity;
import com.comp.backendproject.service.FilterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@Slf4j
public class FilterServiceImp implements FilterService {
    private static final String URL = "https://launch.smarthealthit.org/v/r4/sim/...../fhir/Observation";

    private final RestTemplate restTemplate;

    @Autowired
    public FilterServiceImp(@Qualifier("restRequest") RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    @Override
    public Map<String, Map<String, Object>> getAllObservations() {
        ResponseEntity<ObservationResponse> responseEntity = restTemplate.getForEntity(URL, ObservationResponse.class);
        ObservationResponse responseBody = responseEntity.getBody();
        Map<String, Map<String, Object>> result = new HashMap<>();
        for (Entry entry : responseBody.getEntry()) {
            String text = entry.getResource().getCode().getText();
            ValueQuantity vq = entry.getResource().getValueQuantity();
            Map<String, Object> innerMap = result.computeIfAbsent(text, k -> new HashMap<>());
            if (vq != null) {
                List<ValueQuantity> valueList = (List<ValueQuantity>) innerMap.computeIfAbsent("values", k -> new ArrayList<ValueQuantity>());
                valueList.add(vq);
                innerMap.put("unit", vq.getUnit());
            }
        }
        return result;
    }
}

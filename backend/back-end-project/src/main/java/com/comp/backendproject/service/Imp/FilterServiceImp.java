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
    private static final String URL = "https://launch.smarthealthit.org/v/r4/sim/...../fhir/Observation?_count=1000";

    private static final String HAPIURL = "http://hapi.fhir.org/baseR4/Observation?_count=100&_pretty=true";
    private static final String SMART = "https://launch.smarthealthit.org/v/r4/sim/WzQsIiIsIiIsIiIsMCwwLDAsIiIsIiIsIiIsIiIsIiIsIiIsIiIsMCwxXQ/fhir/Observation?_count=1000";



    private final RestTemplate restTemplate;

    @Autowired
    public FilterServiceImp(@Qualifier("restRequest") RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    @Override
    public Map<String, Map<String, Object>> getAllObservations() {
        ResponseEntity<ObservationResponse> responseEntity = restTemplate.getForEntity(SMART, ObservationResponse.class);
        ObservationResponse responseBody = responseEntity.getBody();
        Map<String, Map<String, Object>> result = new HashMap<>();
        for (Entry entry : responseBody.getEntry()) {
            if (entry.getResource().getCode().getText() != null) {
                String text = entry.getResource().getCode().getText();
                ValueQuantity vq = entry.getResource().getValueQuantity();
                Map<String, Object> innerMap = result.computeIfAbsent(text, k -> new HashMap<>());
                if (vq != null) {
                    List<Object> valueList = (List<Object>) innerMap.computeIfAbsent("value", k -> new ArrayList<>());
                    List<Object> temp  = new ArrayList<>();
                    temp.add(vq);
                    temp.add(entry.getResource().getSubject().getReference());
                    valueList.add(temp);
                    innerMap.put("unit", vq.getUnit());
                }

            }else {
                log.info("text is null");
            }

        }
        return result;
    }
}

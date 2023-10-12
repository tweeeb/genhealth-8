package com.comp.backendproject.constant;

import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

@Component
@Data
public class DataSource {
    public static String FHIR_URL;
    public static String COUNT;


    @Value("${FHIRUrl}")
    public void setFhirUrl(String fhirUrl) {
        DataSource.FHIR_URL = fhirUrl;
    }

    @Value("${DATACOUNT}")
    public void setCount(String count) {
        DataSource.COUNT = count;
    }
}

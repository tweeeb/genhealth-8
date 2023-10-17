package com.comp.backendproject.entity.save.prediction;

import com.comp.backendproject.entity.Encounter.Coding;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "prediction")
public class Prediction {
    @Id
    @JsonIgnore
    private String id;  // MongoDB 会自动为您生成这个字段

    private String patientId;  // 可以有重复的值

    private String date;

    private List<List<Coding>> predictions;
}

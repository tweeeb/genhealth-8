package com.comp.backendproject.entity.Genhealth;

import lombok.Data;

import java.util.List;

@Data
public class ApiRespone {

    List<List<Compoent>> predictions;

    List<Compoent> history;
}

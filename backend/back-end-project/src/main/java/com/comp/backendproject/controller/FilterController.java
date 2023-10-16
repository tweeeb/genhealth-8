package com.comp.backendproject.controller;


import com.comp.backendproject.service.FilterService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@CrossOrigin
@RequestMapping("/api/filter")
@RestController
public class FilterController {

    @Resource
    FilterService filterService;


    @GetMapping("/getDataValue")
    public Object getDataValue() {
        return filterService.getAllObservations();
    }

}

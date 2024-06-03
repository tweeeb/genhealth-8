package com.comp.backendproject.service;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public interface FilterService {

    @Resource
    Object getAllObservations();
}

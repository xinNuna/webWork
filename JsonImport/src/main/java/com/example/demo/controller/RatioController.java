package com.example.demo.controller;

import com.example.demo.bean.Result;
import com.example.demo.service.RatioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RatioController {
    @Autowired
    RatioService ratioService;

    @GetMapping("/ProfessionalRate")
    public Result GradeRatio() throws Exception {
        return ratioService.gradeRatio();
    }
}

package com.onebeld.networkbudgetanalyzer.controllers.api.v1;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1", produces = "application/json")
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "{\"message\": \"Hello world!\"}";
    }
}

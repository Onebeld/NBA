package com.onebeld.networkbudgetanalyzer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/test-error")
    public String testError() {
        throw new RuntimeException("Test error");
    }
}

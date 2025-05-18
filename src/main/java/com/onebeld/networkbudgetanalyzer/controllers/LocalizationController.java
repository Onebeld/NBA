package com.onebeld.networkbudgetanalyzer.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@RestController
@RequestMapping(value = "/locales", produces = "application/json")
public class LocalizationController {
    @GetMapping("/{lang}/{file}")
    public String getLocalization(@PathVariable String lang, @PathVariable String file) throws IOException {
        String path = String.format("static/locales/%s/%s", lang, file);
        ClassPathResource resource = new ClassPathResource(path);

        if (!resource.exists()) {
            throw new FileNotFoundException("Localization file not found: " + path);
        }

        byte[] bytes = Files.readAllBytes(resource.getFile().toPath());

        return new String(bytes, StandardCharsets.UTF_8);
    }
}

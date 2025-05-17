package com.onebeld.networkbudgetanalyzer.services;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * Сервис, при помощи которой пользователь может загружать файлы на сервер
 */
@Service
public class FileStorageService {
    private final Path fileStorageLocation;

    public FileStorageService() {
        this.fileStorageLocation = Paths.get("/files").toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", e);
        }
    }

    public String storeFile(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store empty file " + file.getOriginalFilename());
            }

            String fileName = generateFileName(file);
            Path targetLocation = this.fileStorageLocation.resolve(fileName);

            Files.copy(file.getInputStream(), targetLocation);

            return "/files/" + fileName;
        } catch (Exception e) {
            throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }

    public Path loadFile(String fileName) {
        return fileStorageLocation.resolve(fileName);
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path file = loadFile(fileName);

            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read file: " + fileName);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Could not read file: " + fileName, e);
        }
    }

    public void deleteFile(String url) throws IOException {
        URI uri = URI.create(url);

        String fileName = Paths.get(uri.getPath()).getFileName().toString();
        Path path = fileStorageLocation.resolve(fileName);

        Files.delete(path);
    }

    private String generateFileName(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null) {
            throw new RuntimeException("Filename is empty");
        }

        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));

        return UUID.randomUUID() + "." + extension;
    }
}

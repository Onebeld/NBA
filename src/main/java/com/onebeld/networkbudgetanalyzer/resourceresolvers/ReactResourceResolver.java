package com.onebeld.networkbudgetanalyzer.resourceresolvers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.resource.ResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class ReactResourceResolver implements ResourceResolver {
    private static final String REACT_DIR = "/static/";

    private static final String REACT_BUILD_DIR = "assets/";

    private Resource index = new ClassPathResource(REACT_DIR + "index.html");
    private List<String> rootStaticFiles = Arrays.asList("favicon.ico", "manifest.json", "robots.txt", "vite.svg");

    @Override
    public Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
        return resolve(requestPath, locations);
    }

    @Override
    public String resolveUrlPath(String resourcePath, List<? extends Resource> locations, ResourceResolverChain chain) {
       Resource resolvedResource = resolve(resourcePath, locations);

       if (resolvedResource == null) {
           return null;
       }

       try {
           return resolvedResource.getURL().toString();
       } catch (IOException e) {
           return resolvedResource.getFilename();
       }
    }

    private Resource resolve(String requestPath, List<? extends Resource> locations) {
        if (requestPath == null)
            return null;

        if (rootStaticFiles.contains(requestPath) || requestPath.startsWith(REACT_BUILD_DIR)) {
            return new ClassPathResource(REACT_DIR + requestPath);
        }
        else {
            return index;
        }
    }
}

package com.onebeld.networkbudgetanalyzer.configurations;

import com.onebeld.networkbudgetanalyzer.resourceresolvers.ReactResourceResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.ResourceResolver;

@Configuration
public class SpringConfiguration implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        ResourceResolver resolver = new ReactResourceResolver();

        registry.addResourceHandler("/**")
                .resourceChain(true)
                .addResolver(resolver);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addStatusController("/api/**", HttpStatus.BAD_REQUEST);
        registry.setOrder(1000);
    }
}

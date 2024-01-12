package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.TemplateEngine;

@Configuration
public class TemplateEngineConfig {

    @Bean
    public TemplateEngine templateEngine(){
        return new TemplateEngine();
    }
}

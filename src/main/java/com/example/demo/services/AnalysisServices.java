package com.example.demo.services;

import com.example.demo.dto.AnalyticsDto;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface AnalysisServices {

    AnalyticsDto createAnalysis(AnalyticsDto analyticsDto) throws JsonProcessingException;

    List<AnalyticsDto> getAllAnalytics();
}

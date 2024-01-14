package com.example.demo.mappers.impl;

import com.example.demo.dto.AnalyticsDto;
import com.example.demo.entities.AnalysisEntity;
import com.example.demo.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AnalyticsMapperImpl implements Mapper<AnalysisEntity, AnalyticsDto> {

    private final ModelMapper modelMapper;
    @Override
    public AnalysisEntity mapTo(AnalyticsDto analyticsDto) {
        return modelMapper.map(analyticsDto, AnalysisEntity.class);
    }

    @Override
    public AnalyticsDto mapFrom(AnalysisEntity analysisEntity) {
        return modelMapper.map(analysisEntity, AnalyticsDto.class);
    }
}

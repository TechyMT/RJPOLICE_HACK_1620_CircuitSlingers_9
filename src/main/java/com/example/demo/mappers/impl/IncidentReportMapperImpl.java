package com.example.demo.mappers.impl;

import com.example.demo.dto.IncidentReportDto;
import com.example.demo.entities.IncidentReportEntity;
import com.example.demo.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class IncidentReportMapperImpl implements Mapper<IncidentReportEntity, IncidentReportDto> {

    private final ModelMapper modelMapper;
    @Override
    public IncidentReportEntity mapTo(IncidentReportDto incidentReportDto) {
        return modelMapper.map(incidentReportDto,IncidentReportEntity.class);
    }

    @Override
    public IncidentReportDto mapFrom(IncidentReportEntity incidentReportEntity) {
        return modelMapper.map(incidentReportEntity,IncidentReportDto.class);
    }
}

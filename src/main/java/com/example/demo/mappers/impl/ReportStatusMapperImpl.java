package com.example.demo.mappers.impl;

import com.example.demo.dto.ReportStatusDto;
import com.example.demo.entities.ReportStatusEntity;
import com.example.demo.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReportStatusMapperImpl implements Mapper<ReportStatusEntity, ReportStatusDto> {

    private final ModelMapper modelMapper;
    @Override
    public ReportStatusEntity mapTo(ReportStatusDto reportStatusDto) {
        return modelMapper.map(reportStatusDto,ReportStatusEntity.class);
    }

    @Override
    public ReportStatusDto mapFrom(ReportStatusEntity reportStatusEntity) {
        return modelMapper.map(reportStatusEntity,ReportStatusDto.class);
    }
}

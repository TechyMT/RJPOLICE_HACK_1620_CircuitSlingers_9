package com.example.demo.mappers.impl;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.UserEntity;
import com.example.demo.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper implements Mapper<UserEntity, UserDto> {

    private final ModelMapper modelMapper;
    @Override
    public UserEntity mapTo(UserDto userDto) {
        return modelMapper.map(userDto, UserEntity.class);
    }

    @Override
    public UserDto mapFrom(UserEntity userEntity) {
        return modelMapper.map(userEntity, UserDto.class);
    }
}

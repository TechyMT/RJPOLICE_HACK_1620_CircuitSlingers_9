package com.example.demo.services;

import com.example.demo.dto.UserDto;

public interface UserServices {

    UserDto createUser(UserDto userDto);

    UserDto updateUser(String id , UserDto userDto);

}

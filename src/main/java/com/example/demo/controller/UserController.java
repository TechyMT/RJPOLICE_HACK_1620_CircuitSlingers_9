package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.UserEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.UserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserServices userServices;

    @PostMapping(path = "/add")
    public ResponseEntity<UserDto> adduser(
            @Validated
            @RequestBody UserDto body
    ){
        UserDto userDto = userServices.createUser(body);
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }

    @PostMapping(path = "/update")
    public ResponseEntity<UserDto> updateUser(
            @RequestParam(value = "userUID") String uid,
            @Validated
            @RequestBody UserDto userDto
    ){
       UserDto userDto1 = userServices.updateUser(uid,userDto);
       return new ResponseEntity<>(userDto1,HttpStatus.OK);
    }
}

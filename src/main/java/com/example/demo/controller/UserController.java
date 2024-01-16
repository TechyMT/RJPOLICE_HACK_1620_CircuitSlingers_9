package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.UserEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.UserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserServices userServices;
//    private final PdfGenerationService pdfGenerationService;

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
            @Validated
            @RequestBody UserDto userDto
    ){
       UserDto userDto1 = userServices.updateUser(userDto.getUserUID(),userDto);
       return new ResponseEntity<>(userDto1,HttpStatus.OK);
    }

//    @GetMapping(path = "createPdf")
//    public ResponseEntity<InputStreamResource> createPdf(){
//        ByteArrayInputStream pdf = pdfGenerationService.createPdf();
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.add("Content-Disposition","inline;file=lcwd.pdf");
//        return ResponseEntity
//                .ok()
//                .headers(httpHeaders)
//                .contentType(MediaType.APPLICATION_PDF)
//                .body(new InputStreamResource(pdf));
//    }

    @GetMapping(path = "/ping")
    public ResponseEntity<String> pong(){
        return new ResponseEntity<>("pong",HttpStatus.OK);
    }
}

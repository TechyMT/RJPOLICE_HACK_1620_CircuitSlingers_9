package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<ApiResponse> alreadyExistsExceptions(AlreadyExistsException ex) {
        String message = ex.text;
        ApiResponse apiResponse = new ApiResponse(message, false);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> methodNotFoundValid(MethodArgumentNotValidException ex) {
        Map<String, String> response = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(err -> {
            String fieldName = ((FieldError) err).getField();
            String fieldVal = err.getDefaultMessage();
            response.put(fieldName, fieldVal);
            response.put("success", "false");
        });
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse> unauthorizedException(UnauthorizedException ex) {
        String message = ex.text;
        ApiResponse apiResponse = new ApiResponse(message, false);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);

    }


    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiResponse> unauthorizedException(NotFoundException ex) {
        String text = ex.message;
        ApiResponse apiResponse = new ApiResponse(text, false);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse> illegalArgumentException(IllegalArgumentException ex) {
        String text = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(text, false);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);

    }


}

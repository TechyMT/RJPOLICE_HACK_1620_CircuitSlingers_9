package com.example.demo.exceptions;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class NotFoundException extends RuntimeException{
    public String message;
    public NotFoundException(String text) {
        this.message = text;
    }
}

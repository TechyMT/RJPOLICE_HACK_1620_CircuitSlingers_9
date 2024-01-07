package com.example.demo.exceptions;

public class UnauthorizedException extends RuntimeException {

    public String text;
    public UnauthorizedException(String s) {
        this.text = s;
    }
}

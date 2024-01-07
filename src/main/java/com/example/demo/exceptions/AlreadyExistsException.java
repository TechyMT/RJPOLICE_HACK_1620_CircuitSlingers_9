package com.example.demo.exceptions;


public class AlreadyExistsException extends RuntimeException{
    public String text;
    public AlreadyExistsException(String message){
        this.text = message;
    }
}

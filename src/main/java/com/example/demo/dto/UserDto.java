package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {


    @NotBlank(message = "User UID cannot be blank")
    private String userUID;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email format")
    private String email;

    @Pattern(regexp = "\\d{10}", message = "Invalid phone number format")
    private String phoneNumber;

    private boolean emailVerified;

    @NotBlank(message = "Creation time cannot be blank")
    private String creationTime;

    @NotBlank(message = "Last sign-in time cannot be blank")
    private String lastSignInTime;

}


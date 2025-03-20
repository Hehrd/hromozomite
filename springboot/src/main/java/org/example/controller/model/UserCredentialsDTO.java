package org.example.controller.model;

import lombok.Data;

@Data
public class UserCredentialsDTO {
    private String username;
    private String password;
    private String email;
}

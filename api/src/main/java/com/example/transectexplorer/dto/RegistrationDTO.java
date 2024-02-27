package com.example.transectexplorer.dto;

public class RegistrationDTO {
    private String username;
    private String email;
    private String password;

    public RegistrationDTO() {
    }

    public RegistrationDTO(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserEmail() {
        return this.email;
    }

    public void setUserEmail(String email) {
        this.email = email;
    }

    public String toString() {
        return "Registration info: username: " + this.username + " password: " + this.password;
    }
}

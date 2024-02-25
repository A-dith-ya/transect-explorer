package com.example.transectexplorer.dto;

public class UserDTO {
    private Long id;
    private String userName;
    private String userEmail;

    public UserDTO(Long id, String userName, String userEmail) {
        this.id = id;
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setUsername(String userName) {
        this.userName = userName;
    }

    public String getUsername() {
        return this.userName;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserEmail() {
        return userEmail;
    }
}
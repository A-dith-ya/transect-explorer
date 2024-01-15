package com.example.transectexplorer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class User {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;

  @Column(nullable = false, length = 50)
  private String userName;

  @Column(nullable = false, length = 100, unique = true)
  private String userEmail;

  @Column(nullable = false, length = 100)
  private String userPassword;

  protected User() {}

  public User(String userName, String userEmail, String userPassword) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }
}
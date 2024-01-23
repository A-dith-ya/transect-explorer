package com.example.transectexplorer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Entity
@Table(name = "users")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(nullable = false, length = 50)
  private String userName;

  @Column(nullable = false, length = 100, unique = true)
  private String userEmail;

  @Column(nullable = false, length = 100)
  private String userPassword;

  protected User() {
  }

  public User(String userName, String userEmail, String userPassword) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUserEmail() {
    return userEmail;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return this.userPassword;
  }

  public String setPassword(String userPassword) {
    return this.userPassword = userPassword;
  }

  @Override
  public String getUsername() {
    return this.userName;
  }

  public String setUsername(String userName) {
    return this.userName = userName;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
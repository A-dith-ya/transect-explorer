package com.example.transectexplorer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(String userName, String userEmail, String userPassword) {
        return userRepository.save(new User(userName, userEmail, passwordEncoder.encode(userPassword)));
    }
}

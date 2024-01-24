package com.example.transectexplorer.controller;

import com.example.transectexplorer.model.LoginResponseDTO;
import com.example.transectexplorer.model.RegistrationDTO;
import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.UserRepository;
import com.example.transectexplorer.services.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    @PostMapping("/auth/register")
    public User createUser(@RequestBody RegistrationDTO user) {
        return authenticationService.register(user.getUsername(), user.getUserEmail(), user.getPassword());
    }

    @PostMapping("/auth/login")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO user) {
        return authenticationService.login(user.getUsername(), user.getPassword());
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        if (userRepository.existsById(id)) {
            updatedUser.setId(id);
            return userRepository.save(updatedUser);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}

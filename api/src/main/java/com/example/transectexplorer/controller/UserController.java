package com.example.transectexplorer.controller;

import com.example.transectexplorer.dto.LoginResponseDTO;
import com.example.transectexplorer.dto.RegistrationDTO;
import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.UserRepository;
import com.example.transectexplorer.services.AuthenticationService;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<RegistrationDTO> createUser(@RequestBody RegistrationDTO user) {
        return ResponseEntity
                .ok(authenticationService.register(user.getUsername(), user.getUserEmail(), user.getPassword()));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody RegistrationDTO user, HttpServletResponse response) {
        LoginResponseDTO loginResponse = authenticationService.login(user.getUsername(), user.getPassword(), response);

        if (loginResponse != null) {
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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

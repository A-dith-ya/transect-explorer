package com.example.transectexplorer.controller;

import com.example.transectexplorer.dto.UserDTO;
import com.example.transectexplorer.dto.RegistrationDTO;
import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.UserRepository;
import com.example.transectexplorer.services.AuthenticationService;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("@authenticationService.authorizeUser(#id)")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getUserEmail()))
                .map(userDTO -> new ResponseEntity<>(userDTO, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<RegistrationDTO> createUser(@RequestBody RegistrationDTO user) {
        return new ResponseEntity<>(
                authenticationService.register(user.getUsername(), user.getUserEmail(), user.getPassword()),
                HttpStatus.CREATED);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody RegistrationDTO user, HttpServletResponse response) {
        UserDTO loginResponse = authenticationService.login(user.getUsername(), user.getPassword(), response);

        if (loginResponse != null) {
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("@authenticationService.authorizeUser(#id)")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody RegistrationDTO user) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User updatedUser = userOptional.get();

        if (user.getUsername() != null) {
            updatedUser.setUsername(user.getUsername());
        }
        if (user.getUserEmail() != null) {
            updatedUser.setUserEmail(user.getUserEmail());
        }
        if (user.getPassword() != null) {
            updatedUser.setPassword(authenticationService.hashPassword(user.getPassword()));
        }
            userRepository.save(updatedUser);

            return new ResponseEntity<>(
                    new UserDTO(updatedUser.getId(), updatedUser.getUsername(), updatedUser.getUserEmail()),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@authenticationService.authorizeUser(#id)")
    public ResponseEntity<UserDTO> deleteUser(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

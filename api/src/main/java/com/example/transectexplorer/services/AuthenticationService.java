package com.example.transectexplorer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.transectexplorer.dto.UserDTO;
import com.example.transectexplorer.dto.RegistrationDTO;
import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

@Service
// This annotation ensures that all methods within this class are executed
// within a transactional context. If any method encounters a runtime exception,
// all changes made within that transaction will be rolled back.
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public RegistrationDTO register(String userName, String userEmail, String userPassword) {
        // Save the new user to the database with the password hashed
        userRepository.save(new User(userName, userEmail, passwordEncoder.encode(userPassword)));
        return new RegistrationDTO(userName, userEmail, userPassword);
    }

    // Authenticate a user with the provided username and password
    public UserDTO login(String username, String password, HttpServletResponse response) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            String token = tokenService.generateJwt(auth);

            Cookie cookie = new Cookie("jwt", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");

            response.addCookie(cookie);

            Optional<User> user = userRepository.findByUserName(username);
            // Return a DTO with the login response details and the JWT token
            return new UserDTO(user.get().getId(), user.get().getUsername(), user.get().getUserEmail());
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password");
        }
    }
}

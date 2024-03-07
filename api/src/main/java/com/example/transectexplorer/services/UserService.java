package com.example.transectexplorer.services;

import com.example.transectexplorer.model.User;
import com.example.transectexplorer.model.CustomUserDetails;
import com.example.transectexplorer.repository.UserRepository;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// Interact with the user data in the database.
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    // It is used to fetch user details from the database using username.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User '" + username + "' not found"));

        return new CustomUserDetails(user.getUsername(), user.getPassword(), new ArrayList<>(), user.getId());
    }
}

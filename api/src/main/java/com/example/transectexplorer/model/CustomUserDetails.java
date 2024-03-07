package com.example.transectexplorer.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUserDetails extends User {
    private Long id;

    public CustomUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities,
            Long id) {
        super(username, password, authorities);

        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

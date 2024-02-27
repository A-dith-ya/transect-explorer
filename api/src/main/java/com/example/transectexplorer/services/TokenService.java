package com.example.transectexplorer.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    @Autowired
    private JwtEncoder jwtEncoder;

    @Autowired
    private JwtDecoder jwtDecoder;

    // Method to generate a JWT for a given authentication.
    public String generateJwt(Authentication auth) {
        // Create a JwtClaimsSet with the issuer as "self", the current time as the
        // issuedAt time, and the name of the authentication as the subject.
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(Instant.now())
                .subject(auth.getName())
                .build();

        // Encode the JwtClaimsSet into a JWT and return its token value.
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}

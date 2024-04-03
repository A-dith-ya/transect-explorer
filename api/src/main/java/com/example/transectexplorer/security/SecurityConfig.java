package com.example.transectexplorer.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.example.transectexplorer.utils.RSAKeyProperties;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final RSAKeyProperties keys;

    public SecurityConfig(RSAKeyProperties keys) {
        this.keys = keys;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtDecoder());

        return http
                // Add JWT filter before the main Spring Security filter to ensure JWT is
                // processed first
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                // Configure CORS
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    // Allow these origins
                      configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173","http://10.50.26.219:5173","http://10.112.111.207:8080","https://10.50.26.219:8080","https://10.50.26.219:8080","http://206.123.191.11:8080","https://206.123.191.11:8080","http://10.50.57.163:8080","http://10.0.2.15:8080","http://10.112.111.207:5173","http://10.0.2.15:5173","http://10.50.84.174:5173"));
                    // Allow HTTP methods
                    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE","OPTIONS"));
                    // Allow all headers
                    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", "X-Requested-With", "Accept", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"));
                    // Allow credentials
                    configuration.setAllowCredentials(true);
                    // logger.info("Received CORS request from: " + request.getHeader("Origin"));
                    // logger.info("CORS Configuration Applied: " + configuration.toString());
                    return configuration;
                }))
                // Disable CSRF protection
                .csrf(csrf -> csrf.disable())
                // Configure authorization
                .authorizeHttpRequests(authorize -> {
                    // Allow these paths without authentication
                    authorize.requestMatchers("/v3/**", "/swagger-ui/**").permitAll();
                    authorize.requestMatchers("/users/auth/**").permitAll();
                    // All other requests require authentication
                    authorize.anyRequest().authenticated();
                })
                // Configure session to be stateless
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(UserDetailsService detailsService) {
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        // Set the UserDetailsService to load user-specific data in the security
        daoProvider.setUserDetailsService(detailsService);
        // Set the password encoder to use BCrypt
        daoProvider.setPasswordEncoder(passwordEncoder());
        // Return a ProviderManager to handle authentication with the
        // DaoAuthenticationProvider which will use the UserDetailsService and BCrypt
        // password encoder
        return new ProviderManager(daoProvider);
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        // Use Nimbus with the public key from RSAKeyProperties to decode JWTs
        return NimbusJwtDecoder.withPublicKey(keys.getPublicKey()).build();
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        // Build a JWK from the RSA keys to be used for encoding JWTs
        JWK jwk = new RSAKey.Builder(keys.getPublicKey()).privateKey(keys.getPrivateKey()).build();
        // Create a JWKSource from the JWK to provide keys for JWT encoding
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        // Return a NimbusJwtEncoder with the JWKSource to handle JWT encoding
        return new NimbusJwtEncoder(jwks);
    }
}

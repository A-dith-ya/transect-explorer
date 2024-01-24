package com.example.transectexplorer.repository;

import com.example.transectexplorer.model.User;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUserName(String userName);

    User findByUserEmail(String userEmail);
}
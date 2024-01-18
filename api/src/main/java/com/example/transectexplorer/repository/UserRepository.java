package com.example.transectexplorer.repository;

import com.example.transectexplorer.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUserName(String userName);

    User findByUserEmail(String userEmail);
}
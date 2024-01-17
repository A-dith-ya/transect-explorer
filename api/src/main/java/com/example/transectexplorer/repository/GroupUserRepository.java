package com.example.transectexplorer.repository;

import java.util.List;

import com.example.transectexplorer.model.GroupUser;
import com.example.transectexplorer.model.Group;

import org.springframework.data.repository.CrudRepository;

public interface GroupUserRepository extends CrudRepository<GroupUser, Long> {
    List<GroupUser> findByGroup(Group group);
}
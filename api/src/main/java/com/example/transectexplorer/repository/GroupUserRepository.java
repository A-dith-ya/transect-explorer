package com.example.transectexplorer.repository;

import java.util.List;

import com.example.transectexplorer.model.GroupUser;
import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.model.User;

import org.springframework.data.repository.CrudRepository;

public interface GroupUserRepository extends CrudRepository<GroupUser, Long> {
    List<GroupUser> findByGroup(Group group);

    List<GroupUser> findByGroupId(Long groupId);

    List<GroupUser> findByGroupUser(User user);
}
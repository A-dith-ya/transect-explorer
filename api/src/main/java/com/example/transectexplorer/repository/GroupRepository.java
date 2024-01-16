package com.example.transectexplorer.repository;

import java.util.List;

import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.model.User;
import org.springframework.data.repository.CrudRepository;

public interface GroupRepository extends CrudRepository<Group, Long> {
    Group findByGroupName(String groupName);

    List<Group> findByGroupLeader(User groupLeader);
}
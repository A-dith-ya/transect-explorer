package com.example.transectexplorer.repository;

import java.util.List;

import com.example.transectexplorer.model.GroupUser;
import com.example.transectexplorer.dto.GroupListDTO;
import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.model.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface GroupUserRepository extends CrudRepository<GroupUser, Long> {
    List<GroupUser> findByGroup(Group group);

    List<GroupUser> findByGroupId(Long groupId);

    List<GroupUser> findByGroupUser(User user);

    @Query("SELECT new com.example.transectexplorer.dto.GroupListDTO(gu.group.id, gu.group.groupName, gu.group.createdAt) FROM GroupUser gu WHERE gu.groupUser = ?1")
    List<GroupListDTO> findDtoByGroupUser(User user);

    boolean existsByGroup_IdAndGroupUser_UserName(Long groupId, String userName);
}
package com.example.transectexplorer.controller;

import com.example.transectexplorer.dto.GroupDTO;
import com.example.transectexplorer.dto.UserGroupsDTO;
import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.model.GroupUser;
import com.example.transectexplorer.repository.GroupUserRepository;
import com.example.transectexplorer.repository.GroupRepository;
import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/groups")
public class GroupController {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private GroupUserRepository groupUserRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    @PreAuthorize("@authenticationService.authorizeGroupUser(#id)")
    public ResponseEntity<GroupDTO> getGroupById(@PathVariable Long id) {
        Optional<Group> groupOptional = groupRepository.findById(id);

        if (groupOptional.isPresent()) {
            Group group = groupOptional.get();
            List<GroupUser> groupUsers = groupUserRepository.findByGroup(group);

            // Get the usernames and emails of the users in the group
            List<String> groupUserEmails = new ArrayList<>();
            List<String> groupUserNames = new ArrayList<>();
            for (GroupUser groupUser : groupUsers) {
                groupUserEmails.add(groupUser.getUser().getUserEmail());
                groupUserNames.add(groupUser.getUser().getUsername());
            }

            List<String> groupLeaderDetails = Arrays.asList(group.getGroupLeader().getUserEmail(), group.getGroupLeader().getUsername()
            );

            GroupDTO groupDTO = new GroupDTO(group.getId(), group.getGroupName(), groupLeaderDetails, groupUserEmails, groupUserNames);

            return new ResponseEntity<>(groupDTO, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/userGroups/{userId}")
    @PreAuthorize("@authenticationService.authorizeUser(#userId)")
    public ResponseEntity<UserGroupsDTO> getUserGroups(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent())
            return new ResponseEntity<>(new UserGroupsDTO(groupUserRepository.findDtoByGroupUser(user.get()),
                    groupRepository.findDtoByGroupLeader(user.get())), HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    @PreAuthorize("@authenticationService.authorizeUser(#groupDTO.getGroupLeaderId())")
    public ResponseEntity<GroupDTO> createGroup(@RequestBody GroupDTO groupDTO) {
        Optional<User> groupLeader = userRepository.findById(groupDTO.getGroupLeaderId());

        if (groupLeader.isPresent()) {
            Group group = new Group(groupLeader.get(), groupDTO.getGroupName());
            groupRepository.save(group);

            // Add the users to the group by their email
            for (String email : groupDTO.getGroupUserEmails()) {
                Optional<User> user = userRepository.findByUserEmail(email);

                if (user.isPresent()) {
                    GroupUser groupUser = new GroupUser(group, user.get());
                    groupUserRepository.save(groupUser);
                }
            }

            // Set the id of the groupDTO to the id of the group
            groupDTO.setId(group.getId());

            return new ResponseEntity<>(groupDTO, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}")
    @PreAuthorize("@authenticationService.authorizeUser(#group.getGroupLeaderId())")
    public ResponseEntity<GroupDTO> updateGroup(@RequestBody GroupDTO group) {
        Optional<Group> existingGroup = groupRepository.findById(group.getId());

        if (existingGroup.isPresent()) {
            Optional<User> groupLeader = userRepository.findById(group.getGroupLeaderId());

            if (groupLeader.isPresent()) {
                Group updatedGroup = existingGroup.get();

                // Update the group leader and group name
                updatedGroup.setGroupLeader(groupLeader.get());
                updatedGroup.setGroupName(group.getGroupName());
                groupRepository.save(updatedGroup);

                // Delete the group users
                List<GroupUser> groupUsers = groupUserRepository.findByGroupId(group.getId());
                for (GroupUser groupUser : groupUsers) {
                    groupUserRepository.delete(groupUser);
                }

                List<String> groupUserEmails = new ArrayList<>();
                List<String> groupUserNames = new ArrayList<>();

                // Add the users to the group by their email
                for (String email : group.getGroupUserEmails()) {
                    Optional<User> user = userRepository.findByUserEmail(email);
                    if (user.isPresent()) {
                        GroupUser groupUser = new GroupUser(updatedGroup, user.get());
                        groupUserRepository.save(groupUser);
                        groupUserEmails.add(groupUser.getUser().getUserEmail());
                        groupUserNames.add(groupUser.getUser().getUsername());
                    }
                }

                return new ResponseEntity<>(new GroupDTO(updatedGroup.getId(), updatedGroup.getGroupName(),
                        groupLeader.get().getId(), groupUserEmails, groupUserNames), HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@authenticationService.authorizeGroupOwner(#id)")
    public ResponseEntity<GroupDTO> deleteGroup(@PathVariable Long id) {
        Optional<Group> group = groupRepository.findById(id);

        if (group.isPresent()) {
            List<GroupUser> groupUsers = groupUserRepository.findByGroupId(id);

            // Delete the group users
            for (GroupUser groupUser : groupUsers) {
                groupUserRepository.delete(groupUser);
            }

            groupRepository.deleteById(id);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
package com.example.transectexplorer.controller;

import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.model.GroupUser;
import com.example.transectexplorer.repository.GroupUserRepository;
import com.example.transectexplorer.repository.GroupRepository;
import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;
import java.util.Map;

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
    public Optional<Group> getGroupById(@PathVariable Long id) {
        return groupRepository.findById(id);
    }

    @GetMapping("/groupLeader/{userId}")
    public List<Group> getGroupsByUserId(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return groupRepository.findByGroupLeader(user);
        } else {
            return null;
        }
    }

    @PostMapping
    public Group createGroup(@RequestBody Map<String, Object> requestBody) {
        Long groupLeaderId = ((Number) requestBody.get("groupLeaderId")).longValue();
        User groupLeader = userRepository.findById(groupLeaderId).orElse(null);

        if (groupLeader != null) {
            Group group = new Group(groupLeader, (String) requestBody.get("groupName"));
            groupRepository.save(group);

            List<String> groupUserEmails = (List<String>) requestBody.get("groupUserEmails");
            for (String email : groupUserEmails) {
                Optional<User> user = userRepository.findByUserEmail(email);
                if (user.isPresent()) {
                    GroupUser groupUser = new GroupUser(group, user.get());
                    groupUserRepository.save(groupUser);
                }
            }

            return group;
        } else {
            return null;
        }
    }

    @PutMapping("/{id}")
    public Group updateGroup(@PathVariable Long id, @RequestBody Map<String, Object> requestBody) {
        if (groupRepository.existsById(id)) {
            Long groupLeaderId = ((Number) requestBody.get("groupLeaderId")).longValue();
            User groupLeader = userRepository.findById(groupLeaderId).orElse(null);

            if (groupLeader != null) {
                Group updatedGroup = new Group(groupLeader, (String) requestBody.get("groupName"));
                updatedGroup.setId(id);
                return groupRepository.save(updatedGroup);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteGroup(@PathVariable Long id) {
        List<GroupUser> groupUsers = groupUserRepository.findByGroupId(id);
        for (GroupUser groupUser : groupUsers) {
            groupUserRepository.delete(groupUser);
        }
        groupRepository.deleteById(id);
    }
}
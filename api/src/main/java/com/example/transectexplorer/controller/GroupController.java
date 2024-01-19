package com.example.transectexplorer.controller;

import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.repository.GroupRepository;
import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/groups")
public class GroupController {
    
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public Optional<Group> getGroupById(@PathVariable Long id) {
        return groupRepository.findById(id);
    }

    @PostMapping
    public Group createGroup(@RequestBody Map<String, Object> requestBody) {
        Long groupLeaderId = ((Number) requestBody.get("groupLeaderId")).longValue();
        User groupLeader = userRepository.findById(groupLeaderId).orElse(null);

        if (groupLeader != null) {
            Group group = new Group(groupLeader, (String) requestBody.get("groupName"));
            return groupRepository.save(group);
        } else {
            return null;
        }
    }

    @PutMapping("/{id}")
    public Group updateGroup(@PathVariable Long id, @RequestBody Group updatedGroup) {
        if (groupRepository.existsById(id)) {
            updatedGroup.setId(id);
            return groupRepository.save(updatedGroup);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteGroup(@PathVariable Long id) {
        groupRepository.deleteById(id);
    }
}
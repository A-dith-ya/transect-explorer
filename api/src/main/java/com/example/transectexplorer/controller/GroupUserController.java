package com.example.transectexplorer.controller;

import com.example.transectexplorer.model.GroupUser;
import com.example.transectexplorer.repository.GroupUserRepository;
import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.UserRepository;
import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/groupUsers")
public class GroupUserController {
        
        @Autowired
        private GroupUserRepository groupUserRepository;
    
        @Autowired
        private UserRepository userRepository;
    
        @Autowired
        private GroupRepository groupRepository;
    
        @GetMapping("/{id}")
        public Optional<GroupUser> getGroupUserById(@PathVariable Long id) {
            return groupUserRepository.findById(id);
        }

        @GetMapping("/group/{id}")
        public List<GroupUser> getGroupUsersByGroupId(@PathVariable Long id) {
            return groupUserRepository.findByGroupId(id);
        }
    
        @PostMapping
        public GroupUser createGroupUser(@RequestBody Map<String, Object> requestBody) {
            Long userId = ((Number) requestBody.get("userId")).longValue();
            User user = userRepository.findById(userId).orElse(null);
    
            Long groupId = ((Number) requestBody.get("groupId")).longValue();
            Group group = groupRepository.findById(groupId).orElse(null);
    
            if (user != null && group != null) {
                GroupUser groupUser = new GroupUser(group, user);
                return groupUserRepository.save(groupUser);
            } else {
                return null;
            }
        }
    
        @PutMapping("/{id}")
        public GroupUser updateGroupUser(@PathVariable Long id, @RequestBody Map<String, Object> requestBody) {
            if (groupUserRepository.existsById(id)) {
                Long userId = ((Number) requestBody.get("userId")).longValue();
                User user = userRepository.findById(userId).orElse(null);
    
                Long groupId = ((Number) requestBody.get("groupId")).longValue();
                Group group = groupRepository.findById(groupId).orElse(null);
    
                if (user != null && group != null) {
                    GroupUser updatedGroupUser = new GroupUser(group, user);
                    updatedGroupUser.setId(id);
                    return groupUserRepository.save(updatedGroupUser);
                } else {
                    return null; 
                }
            } else {
                return null; 
            }
        }
    
        @DeleteMapping("/{id}")
        public void deleteGroupUser(@PathVariable Long id) {
            groupUserRepository.deleteById(id);
        }
}



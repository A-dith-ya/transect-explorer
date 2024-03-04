package com.example.transectexplorer.dto;

import java.util.List;

public class UserGroupsDTO {
    private List<GroupListDTO> userGroups;
    private List<GroupListDTO> leaderGroups;

    public UserGroupsDTO(List<GroupListDTO> userGroups, List<GroupListDTO> leaderGroups) {
        this.userGroups = userGroups;
        this.leaderGroups = leaderGroups;
    }

    public List<GroupListDTO> getUserGroups() {
        return userGroups;
    }

    public List<GroupListDTO> getleaderGroups() {
        return leaderGroups;
    }
}

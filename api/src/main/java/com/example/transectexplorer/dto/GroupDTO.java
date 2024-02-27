package com.example.transectexplorer.dto;

import java.util.List;

public class GroupDTO {
    private Long id;
    private String groupName;
    private Long groupLeaderId;
    private List<String> groupUserEmails;

    public GroupDTO() {
    }

    public GroupDTO(String groupName, Long groupLeaderId, List<String> groupUserEmails) {
        this.groupName = groupName;
        this.groupLeaderId = groupLeaderId;
        this.groupUserEmails = groupUserEmails;
    }

    public GroupDTO(Long id, String groupName, Long groupLeaderId, List<String> groupUserEmails) {
        this.id = id;
        this.groupName = groupName;
        this.groupLeaderId = groupLeaderId;
        this.groupUserEmails = groupUserEmails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Long getGroupLeaderId() {
        return groupLeaderId;
    }

    public void setGroupLeaderId(Long groupLeaderId) {
        this.groupLeaderId = groupLeaderId;
    }

    public List<String> getGroupUserEmails() {
        return groupUserEmails;
    }

    public void setGroupUserEmails(List<String> groupUserEmails) {
        this.groupUserEmails = groupUserEmails;
    }
}

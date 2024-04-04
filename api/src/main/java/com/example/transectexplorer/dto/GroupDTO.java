package com.example.transectexplorer.dto;

import java.util.List;

public class GroupDTO {
    private Long id;
    private String groupName;
    private Long groupLeaderId;
    private List<String> groupLeader;
    private List<String> groupUserEmails;
    private List<String> groupUserNames;

    public GroupDTO() {
    }

    public GroupDTO(String groupName, Long groupLeaderId, List<String> groupUserEmails) {
        this.groupName = groupName;
        this.groupLeaderId = groupLeaderId;
        this.groupUserEmails = groupUserEmails;
    }

    public GroupDTO(Long id, String groupName, Long groupLeaderId, List<String> groupUserEmails,
            List<String> groupUserNames) {
        this.id = id;
        this.groupName = groupName;
        this.groupLeaderId = groupLeaderId;
        this.groupUserEmails = groupUserEmails;
        this.groupUserNames = groupUserNames;
    }

    public GroupDTO(Long id, String groupName, List<String> groupLeader, List<String> groupUserEmails, List<String> groupUserNames) {
        this.id = id;
        this.groupName = groupName;
        this.groupLeader = groupLeader;
        this.groupUserEmails = groupUserEmails;
        this.groupUserNames = groupUserNames;
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

    public void setGroupLeader(List<String> groupLeader) {
        this.groupLeader = groupLeader;
    }

    public List<String> getGroupLeader() {
        return groupLeader;
    }

    public List<String> getGroupUserEmails() {
        return groupUserEmails;
    }

    public void setGroupUserEmails(List<String> groupUserEmails) {
        this.groupUserEmails = groupUserEmails;
    }

    public List<String> getGroupUserNames() {
        return groupUserNames;
    }

    public void setGroupUserNames(List<String> groupUserNames) {
        this.groupUserNames = groupUserNames;
    }
}

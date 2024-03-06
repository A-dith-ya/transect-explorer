package com.example.transectexplorer.dto;

import java.time.LocalDate;

public class GroupListDTO {
    private Long id;
    private String groupName;
    private LocalDate createdAt;

    public GroupListDTO(Long id, String groupName, LocalDate createdAt) {
        this.id = id;
        this.groupName = groupName;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getGroupName() {
        return groupName;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }
}

package com.example.transectexplorer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class GroupUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Group group;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User groupUser;

    protected GroupUser() {
    };

    public GroupUser(Group group, User groupUser) {
        this.group = group;
        this.groupUser = groupUser;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return groupUser.getUsername();
    }
}

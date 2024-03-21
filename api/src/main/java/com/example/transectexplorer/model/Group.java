package com.example.transectexplorer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "groups")
public class Group extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  @JoinColumn(nullable = false)
  private User groupLeader;

  @Column(nullable = false, length = 50)
  private String groupName;

  protected Group() {
  };

  public Group(User groupLeader, String groupName) {
    this.groupLeader = groupLeader;
    this.groupName = groupName;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getId() {
    return id;
  }

  public String getGroupName() {
    return groupName;
  }

  public void setGroupName(String groupName) {
    this.groupName = groupName;
  }

  public Long getGroupLeaderId() {
    return groupLeader.getId();
  }

  public User getGroupLeader() {
    return groupLeader;
  }

  public void setGroupLeader(User groupLeader) {
    this.groupLeader = groupLeader;
  }
}

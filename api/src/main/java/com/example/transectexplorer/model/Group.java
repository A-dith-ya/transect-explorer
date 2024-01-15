package com.example.transectexplorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class Group {
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
}

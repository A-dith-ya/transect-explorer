package com.example.transectexplorer.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

@Entity
public class Transect {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Group group;

    @Column(nullable = false, length = 50)
    private String transectName;

    @Column(nullable = false, length = 50)
    private String observations;

    @Column(nullable = false)
    private LocalDate dateCreated;

    private String attachment;

    protected Transect() {
    };

    public Transect(Group group, String transectName, String observations, String attachment) {
        this.group = group;
        this.transectName = transectName;
        this.observations = observations;
        this.attachment = attachment;
    }

    @PrePersist
    protected void onCreate() {
        this.dateCreated = LocalDate.now();
    }
}

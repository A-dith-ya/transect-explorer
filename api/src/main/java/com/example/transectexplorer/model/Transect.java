package com.example.transectexplorer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Transect extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Group group;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User userCreator;

    @Column(nullable = false, length = 50)
    private String transectName;

    @Column(nullable = false, length = 50)
    private String description;

    @Column(nullable = false, length = 50)
    private String location;

    @Column(nullable = false, length = 50)
    private String coordinate;

    protected Transect() {
    };

    public Transect(Group group, User userCreator, String transectName, String description, String location,
            String coordinate) {
        this.group = group;
        this.userCreator = userCreator;
        this.transectName = transectName;
        this.description = description;
        this.location = location;
        this.coordinate = coordinate;
    }
}

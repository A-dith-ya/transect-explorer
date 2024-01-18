package com.example.transectexplorer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Coordinate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Transect transect;

    @Column(nullable = false, length = 50)
    private String coordinates;

    protected Coordinate() {
    };

    public Coordinate(Transect transect, String coordinates) {
        this.transect = transect;
        this.coordinates = coordinates;
    }
}

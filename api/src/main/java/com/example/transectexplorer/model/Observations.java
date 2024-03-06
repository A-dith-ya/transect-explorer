package com.example.transectexplorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Observations extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Transect transect;

    @Column(nullable = false, length = 50)
    private String observation;

    @Column(length = 50)
    private String fileName;

    @Column(length = 50)
    private String fileType;

    @Column(length = 50)
    private String fileSize;

    @Column(length = 50)
    private String imageURL;

    protected Observations() {
    };

    public Observations(Transect transect, String observation, String fileName, String fileType, String fileSize,
            String imageURL) {
        this.transect = transect;
        this.observation = observation;
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.imageURL = imageURL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

}

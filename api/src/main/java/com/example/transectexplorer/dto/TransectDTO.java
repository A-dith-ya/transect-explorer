package com.example.transectexplorer.dto;

public class TransectDTO {
    private Long id;
    private Long groupId;
    private Long userCreatorId;
    private String transectName;
    private String description;
    private String location;
    private String coordinate;
    private String userCreatorName;

    public TransectDTO() {
    }

    public TransectDTO(Long id, String transectName, String description, String location, String coordinate,
            String userCreatorName) {
        this.id = id;
        this.transectName = transectName;
        this.description = description;
        this.location = location;
        this.coordinate = coordinate;
        this.userCreatorName = userCreatorName;
    }

    public TransectDTO(Long groupId, Long userCreatorId, String transectName, String description, String location,
            String coordinate) {
        this.groupId = groupId;
        this.userCreatorId = userCreatorId;
        this.transectName = transectName;
        this.description = description;
        this.location = location;
        this.coordinate = coordinate;
    }

    public TransectDTO(Long id, Long groupId, Long userCreatorId, String transectName, String description, String location, String coordinate,
            String userCreatorName) {
        this.id = id;
        this.groupId = groupId;
        this.userCreatorId = userCreatorId;
        this.transectName = transectName;
        this.description = description;
        this.location = location;
        this.coordinate = coordinate;
        this.userCreatorName = userCreatorName;
    }

    public TransectDTO(Long id, Long groupId, String transectName, String description, String location, String coordinate,
            String userCreatorName) {
        this.id = id;
        this.groupId = groupId;
        this.transectName = transectName;
        this.description = description;
        this.location = location;
        this.coordinate = coordinate;
        this.userCreatorName = userCreatorName;
    }

    public Long getId() {
        return id;
    }

    public Long getGroupId() {
        return groupId;
    }

    public Long getUserCreatorId() {
        return userCreatorId;
    }

    public String getTransectName() {
        return transectName;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public String getCoordinate() {
        return coordinate;
    }

    public String getUserCreatorName() {
        return userCreatorName;
    }
}

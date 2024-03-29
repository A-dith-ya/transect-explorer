package com.example.transectexplorer.repository;

import java.util.List;

import com.example.transectexplorer.model.Transect;
import com.example.transectexplorer.dto.TransectDTO;
import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TransectRepository extends CrudRepository<Transect, Long> {
    Transect findByTransectName(String transectName);

    @Query("SELECT new com.example.transectexplorer.dto.TransectDTO(t.id, t.transectName, t.description, t.location, t.coordinate, t.userCreator.userName) FROM Transect t WHERE t.group = ?1")
    List<TransectDTO> findByGroup(Group group);

    List<Transect> findByUserCreator(User userCreator);
}
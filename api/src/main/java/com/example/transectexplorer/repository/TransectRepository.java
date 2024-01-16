package com.example.transectexplorer.repository;

import java.util.List;

import com.example.transectexplorer.model.Transect;
import com.example.transectexplorer.model.Group;
import org.springframework.data.repository.CrudRepository;

public interface TransectRepository extends CrudRepository<Transect, Long> {
    Transect findByTransectName(String transectName);

    List<Transect> findByGroup(Group group);
}
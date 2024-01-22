package com.example.transectexplorer.repository;

import java.util.List;

import com.example.transectexplorer.model.Coordinate;
import com.example.transectexplorer.model.Transect;

import org.springframework.data.repository.CrudRepository;

public interface CoordinateRepository extends CrudRepository<Coordinate, Long> {
    List<Coordinate> findByTransectId(Long transectId);
}
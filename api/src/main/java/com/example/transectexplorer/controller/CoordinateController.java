package com.example.transectexplorer.controller;

import com.example.transectexplorer.model.Coordinate;
import com.example.transectexplorer.repository.CoordinateRepository;
import com.example.transectexplorer.model.Transect;
import com.example.transectexplorer.repository.TransectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/coordinates")
public class CoordinateController {

    @Autowired
    private CoordinateRepository coordinateRepository;

    @Autowired
    private TransectRepository transectRepository;

    @GetMapping("/transect/{id}")
    public List<Coordinate> getCoordinatesByTransectId(@PathVariable Long id) {
        return coordinateRepository.findByTransectId(id);
    }

    @PostMapping
    public Coordinate createCoordinate(@RequestBody Map<String, Object> requestBody) {
        Long transectId = ((Number) requestBody.get("transectId")).longValue();
        Transect transect = transectRepository.findById(transectId).orElse(null);

        if (transect != null) {
            Coordinate coordinate = new Coordinate(transect, (String) requestBody.get("coordinate"));
            return coordinateRepository.save(coordinate);
        } else {
            return null;
        }
    }
}
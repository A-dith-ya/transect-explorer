package com.example.transectexplorer.controller;

import com.example.transectexplorer.model.Transect;
import com.example.transectexplorer.repository.TransectRepository;
import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/transects")
public class TransectController {

    @Autowired
    private TransectRepository transectRepository;

    @Autowired
    private GroupRepository groupRepository;

    @DeleteMapping("/{id}")
    public void deleteTransect(@PathVariable Long id) {
        transectRepository.deleteById(id);
    }
}
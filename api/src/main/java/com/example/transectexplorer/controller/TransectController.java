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

    @PostMapping
    public Transect createTransect(@RequestBody Map<String, Object> requestBody) {
        Long groupId = ((Number) requestBody.get("groupId")).longValue();
        Group group = groupRepository.findById(groupId).orElse(null);

        if (group != null) {
            Transect transect = new Transect(group, (String) requestBody.get("transectName"),
                    (String) requestBody.get("observations"), (String) requestBody.get("attachment"));
            return transectRepository.save(transect);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteTransect(@PathVariable Long id) {
        transectRepository.deleteById(id);
    }
}
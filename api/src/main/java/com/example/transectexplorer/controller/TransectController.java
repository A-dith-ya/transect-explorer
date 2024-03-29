package com.example.transectexplorer.controller;

import com.example.transectexplorer.model.Transect;
import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.TransectRepository;
import com.example.transectexplorer.repository.UserRepository;
import com.example.transectexplorer.dto.TransectDTO;
import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transects")
public class TransectController {

    @Autowired
    private TransectRepository transectRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<TransectDTO> createTransect(@RequestBody TransectDTO transectDTO) {
        Optional<Group> group = groupRepository.findById(transectDTO.getGroupId());
        Optional<User> user = userRepository.findById(transectDTO.getUserCreatorId());

        if (group.isPresent() && user.isPresent()) {
            Transect transect = new Transect(group.get(), user.get(), transectDTO.getTransectName(),
                    transectDTO.getDescription(), transectDTO.getLocation(), transectDTO.getCoordinate());

            transectRepository.save(transect);

            return new ResponseEntity<>(transectDTO, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransectDTO> getTransectById(@PathVariable Long id) {
        return transectRepository.findById(id)
                .map(transect -> new TransectDTO(transect.getId(), transect.getTransectName(),
                        transect.getDescription(), transect.getLocation(), transect.getCoordinate(),
                        transect.getUserCreator().getUsername()))
                .map(transectDTO -> new ResponseEntity<>(transectDTO, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/groups/{groupId}")
    public ResponseEntity<List<TransectDTO>> getTransectsByGroupId(@PathVariable Long groupId) {
        return groupRepository.findById(groupId)
                .map(group -> transectRepository.findByGroup(group))
                .map(transectDTO -> new ResponseEntity<>(transectDTO, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransectDTO> updateTransect(@RequestBody TransectDTO transectDTO) {
        Optional<Transect> transect = transectRepository.findById(transectDTO.getId());

        if (transect.isPresent()) {
            transect.get().setTransectName(transectDTO.getTransectName());
            transect.get().setDescription(transectDTO.getDescription());
            transect.get().setLocation(transectDTO.getLocation());
            transect.get().setCoordinate(transectDTO.getCoordinate());

            transectRepository.save(transect.get());

            return new ResponseEntity<>(transectDTO, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransect(@PathVariable Long id) {
        if (transectRepository.existsById(id)) {
            transectRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<TransectDTO>> getTransectsByUserCreatorId(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            List<Transect> transects = transectRepository.findByUserCreator(user.get());
            List<TransectDTO> transectDTOs = transects.stream()
                    .map(transect -> new TransectDTO(
                            transect.getId(),
                            transect.getGroup().getId(),
                            transect.getUserCreator().getId(),
                            transect.getTransectName(),
                            transect.getDescription(),
                            transect.getLocation(),
                            transect.getCoordinate(),
                            transect.getUserCreator().getUsername()
                    ))
                    .toList();
            return new ResponseEntity<>(transectDTOs, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
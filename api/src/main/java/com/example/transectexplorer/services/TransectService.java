package com.example.transectexplorer.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.transectexplorer.dto.TransectDTO;
import com.example.transectexplorer.model.Group;
import com.example.transectexplorer.model.Transect;
import com.example.transectexplorer.model.User;
import com.example.transectexplorer.repository.GroupRepository;
import com.example.transectexplorer.repository.TransectRepository;
import com.example.transectexplorer.repository.UserRepository;

@Service
public class TransectService {
    @Autowired
    private TransectRepository transectRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    public List<TransectDTO> createTransects(List<TransectDTO> transectDTOs) {
        List<Transect> transects = transectDTOs.stream()
                .map(this::convertToTransect)
                .collect(Collectors.toList());
        List<Transect> savedTransects = (List<Transect>) transectRepository.saveAll(transects);

        return savedTransects.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private Transect convertToTransect(TransectDTO transectDTO) {
        Optional<Group> group = groupRepository.findById(transectDTO.getGroupId());
        Optional<User> user = userRepository.findById(transectDTO.getUserCreatorId());

        if (!group.isPresent() || !user.isPresent()) {
            throw new IllegalArgumentException("Invalid group or user");
        }

        return new Transect(group.get(), user.get(), transectDTO.getTransectName(),
                transectDTO.getDescription(), transectDTO.getLocation(), transectDTO.getCoordinate());
    }

    private TransectDTO convertToDTO(Transect transect) {
        return new TransectDTO(
                transect.getId(),
                transect.getGroup().getId(),
                transect.getUserCreator().getId(),
                transect.getTransectName(),
                transect.getDescription(),
                transect.getLocation(),
                transect.getCoordinate(),
                transect.getUserCreator().getUsername());
    }
}

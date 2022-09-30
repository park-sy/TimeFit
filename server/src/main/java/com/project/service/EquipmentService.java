package com.project.service;


import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.Equipment;
import com.project.exception.CenterNotFound;
import com.project.exception.EquipmentNotFound;
import com.project.repository.CenterEquipmentRepository;
import com.project.repository.CenterRepository;
import com.project.repository.EquipmentRepository;
import com.project.request.CenterEquipmentAdd;
import com.project.request.EquipmentCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class EquipmentService {

    private final CenterEquipmentRepository centerEquipmentRepository;

    private final CenterRepository centerRepository;
    private final EquipmentRepository equipmentRepository;


    public void addEquipment(CenterEquipmentAdd request){
//        for (EquipmentAdd r: request
//             ) {
        Center center = centerRepository.findById(request.getCenter()).orElseThrow(CenterNotFound::new);
        Equipment equipment = equipmentRepository.findById(request.getEquipment()).orElseThrow(CenterNotFound::new);
        centerEquipmentRepository.save(
                CenterEquipment.builder()
                        .center(center)
                        .equipment(equipment)
                        .xLoc(request.getXLoc())
                        .yLoc(request.getYLoc())
                        .build());
//        }
    }

    public void setEquipmentImage(long equipmentId, String img){
        Equipment equipment = equipmentRepository.findById(equipmentId).orElseThrow(EquipmentNotFound::new);
        equipment.setImg(img);
        equipmentRepository.save(equipment);
    }

    public List<CenterEquipment> getByCenter(Long centerId) {
        Center center = centerRepository.findById(centerId).orElseThrow(CenterNotFound::new);
        return centerEquipmentRepository.findByCenter(center);
    }

    public List<Equipment> getAllEquipment() {
        List<Equipment> equipment = equipmentRepository.findAll();
        return equipment;
    }
    public void add(EquipmentCategory request) {
        Equipment equipment = Equipment.builder()
                .name(request.getName())
                .img(request.getImg())
                .build();
        equipmentRepository.save(equipment);
    }
}

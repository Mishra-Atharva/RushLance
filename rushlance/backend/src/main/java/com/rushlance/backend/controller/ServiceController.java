package com.rushlance.backend.controller;

import com.rushlance.backend.model.Services;
import com.rushlance.backend.repo.ServiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ServiceController {

    @Autowired
    private ServiceRepo serviceRepo;

    @PostMapping("/service")
    public Services addService(@RequestBody Services service) {
        return serviceRepo.save(service);
    }

    @GetMapping("/service")
    public List<Services> getAllServices()
    {
        return this.serviceRepo.getAll();
    }

    @DeleteMapping("/service")
    public ResponseEntity<?> deleteService(@RequestBody Map<String, Object> details) {
        try {
            Integer id = (Integer) details.get("id");
            this.serviceRepo.deleteService(id);
            return ResponseEntity.ok().body(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}

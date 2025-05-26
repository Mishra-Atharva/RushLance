package com.rushlance.backend.controller;

import com.rushlance.backend.model.Notifications;
import com.rushlance.backend.repo.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class NotificationController {

    @Autowired
    NotificationRepo notificationRepo;

    @PostMapping("/notifications")
    public Notifications addNotification(@RequestBody Notifications notifications) {
        return notificationRepo.save(notifications);
    }

    @GetMapping("/notifications")
    public List<Notifications> getAllNotifications()
    {
        return this.notificationRepo.getAll();
    }

    @PostMapping("/notificationID")
    public List<Notifications> getNotificationById(@RequestBody Map<String, Object> data) {
        String email = (String) data.get("email");
        return this.notificationRepo.getNotifcations(email);
    }
}

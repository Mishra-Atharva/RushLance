package com.rushlance.backend.controller;

import com.rushlance.backend.model.*;
import com.rushlance.backend.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class MainController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/users")
    public List<Users> get_users()
    {
        return this.userRepo.getAll();
    }

    @PostMapping("/user")
    public Users getUserDetailsByEmail(@RequestBody Map<String, Object> email)
    {
        String email_str = (String) email.get("email");
        return this.userRepo.findByEmail(email_str);
    }

    @PostMapping("/user-email")
    public String getUserType(@RequestBody Map<String, Object> email)
    {
        String email_str = (String) email.get("email");
        Users user = this.userRepo.findByEmail(email_str);
        return user.getUser_type();
    }

    @PostMapping("/userID")
    public Map<String, Object> getUserDetailsById(@RequestBody Map<String, Object> id)
    {
        Integer userID = (Integer) id.get("id");
        return this.userRepo.userIdDetails(userID);
    }

    @PostMapping("/dashboard-freelancer")
    public Map<String, Object> getFreelancerDetails(@RequestBody Map<String, Object> email)
    {
        Users user = getUserDetailsByEmail(email);
        return this.userRepo.getFreelancerDashboardDetails(user.getId());
    }

    @PostMapping("/dashboard-freelancer-service")
    public List<Map<String, Object>> getFreelancerServiceDetails(@RequestBody Map<String, Object> email)
    {
        Users user = getUserDetailsByEmail(email);
        return this.userRepo.getFreelancerServiceDetails(user.getId());
    }

    @PostMapping("/chat")
    public List<Map<String, Object>> getChats(@RequestBody Map<String, Object> email)
    {
        String email_str = (String) email.get("email");
        return this.userRepo.getChat(email_str);
    }
}
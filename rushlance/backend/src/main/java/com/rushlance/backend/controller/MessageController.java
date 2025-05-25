package com.rushlance.backend.controller;

import com.rushlance.backend.model.Messages;
import com.rushlance.backend.repo.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class MessageController {

    @Autowired
    private MessageRepo messageRepo;

    @PostMapping("/messages")
    public Messages addMessage(@RequestBody Map<String, Object> data) {
        String r_name = data.get("r_name").toString();
        String email = data.get("email").toString();
        String content = data.get("message").toString();

        System.out.println(r_name);
        System.out.println(email);
        System.out.println(content);

        Map<String, Object> n_details = this.messageRepo.getDetails(r_name, email);

        Messages message = new Messages();
        message.setSender_id(Integer.parseInt(n_details.get("sender_id").toString()));
        message.setReceiver_id(Integer.parseInt(n_details.get("receiver_id").toString()));
        message.setContent(content);

        return messageRepo.save(message);
    }

    @GetMapping("/messages")
    public List<Messages> getAllMessages()
    {
        return this.messageRepo.getAll();
    }

    @PostMapping("/messageID")
    public List<Messages> getMessageById(@RequestBody Map<String, Object> id)
    {
        Integer bookingId = (Integer) id.get("id");
        return this.messageRepo.getByBookingId(bookingId);
    }
}

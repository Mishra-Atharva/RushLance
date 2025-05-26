package com.rushlance.backend.controller;

import com.rushlance.backend.model.Transactions;
import com.rushlance.backend.repo.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class TransactionController {

    @Autowired
    private TransactionRepo transactionRepo;

    @PostMapping("/transactions")
    public void addTransaction(@RequestBody Map<String,Object> details) {
        String c_name = details.get("c_name").toString();
        String f_name = details.get("f_name").toString();
        try {
            this.transactionRepo.addTransaction(c_name, f_name);
        } catch (Exception e) {
            // Optionally log the error
            System.err.println("Failed to add transaction: " + e.getMessage());
        }

        try {
            this.transactionRepo.updateMoney(c_name, f_name);
        } catch (Exception e) {
            System.err.println("Failed to update money/bookings: " + e.getMessage());
        }

        try {
            this.transactionRepo.sendNotification(c_name, f_name);
        } catch (Exception e) {
            System.err.println("Failed to send notifications: " + e.getMessage());
        }
    }

    @GetMapping("/transactions")
    public List<Transactions> getAllTransactions()
    {
        return this.transactionRepo.getAll();
    }
}

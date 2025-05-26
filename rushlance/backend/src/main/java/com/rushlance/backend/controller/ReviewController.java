package com.rushlance.backend.controller;

import com.rushlance.backend.model.Reviews;
import com.rushlance.backend.repo.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ReviewController {

    @Autowired
    private ReviewRepo reviewRepo;

    @PostMapping("/reviews")
    public Reviews addReview(@RequestBody Map<String, Object> data) {
        Integer rating = (Integer) data.get("rating");
        String comment = (String) data.get("comment");
        Integer bookingId = (Integer) data.get("booking_id");
        return this.reviewRepo.createReviews(rating, comment, bookingId);
    }

    @GetMapping("/reviews")
    public List<Reviews> getAllReviews() {
        return this.reviewRepo.getAll();
    }

    @PostMapping("/reviewID")
    public List<Map<String, Object>> getReviewsById(@RequestBody Map<String, Object> id) {
        Integer reviewID = (Integer) id.get("id");
        return this.reviewRepo.getReviews(reviewID);
    }
}

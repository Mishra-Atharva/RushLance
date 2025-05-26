package com.rushlance.backend.repo;
import com.rushlance.backend.model.Reviews;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepo extends JpaRepository<Reviews, Integer>{
    @Query(value="SELECT * FROM reviews", nativeQuery=true)
    List<Reviews> getAll();

    @Query(value="SELECT * FROM reviews WHERE freelancer_id = :id", nativeQuery=true)
    List<Reviews> getReviewsById(@Param("id") Integer id);


    @Query(value = "SELECT r.id AS review_id, r.rating, r.comment, r.created_at, srv.title AS service_title, reviewer.full_name AS reviewer_name FROM reviews r JOIN services srv ON r.service_id = srv.id JOIN users reviewer ON r.reviewer_id = reviewer.id WHERE r.freelancer_id = :id ORDER BY r.created_at DESC;", nativeQuery = true)
    List<Map<String, Object>> getReviews(@Param("id") Integer id);

    @Query(value = "INSERT INTO reviews ( service_id, booking_id, freelancer_id, reviewer_id, rating, comment, created_at ) SELECT  b.service_id, b.id AS booking_id, b.freelancer_id, b.client_id AS reviewer_id, :rating AS rating, :comment AS comment, CURRENT_TIMESTAMP AS created_at FROM bookings b WHERE b.id = :booking_id RETURNING *;", nativeQuery = true)
    Reviews createReviews(@Param("rating") Integer rating, @Param("comment") String comment, @Param("booking_id") Integer booking_id);
}

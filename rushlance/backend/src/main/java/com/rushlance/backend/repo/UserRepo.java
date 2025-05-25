package com.rushlance.backend.repo;

import com.rushlance.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer>
{
    Users findByEmail(String email);

    @Query(value="SELECT * FROM users", nativeQuery=true)
    List<Users> getAll();

    @Query(value = "SELECT full_name, gender, date_of_birth, email, phone, user_type  FROM users WHERE id = :id", nativeQuery = true)
    Map<String, Object> userIdDetails(@Param("id") Integer id);

    @Query(value = "SELECT(SELECT COUNT(*) FROM BOOKINGS b WHERE b.freelancer_id = :id AND b.status = 'completed') AS jobs, (SELECT COALESCE(SUM(s.price), 0) FROM BOOKINGS b JOIN SERVICES s ON b.service_id = s.id WHERE b.freelancer_id = :id AND b.status = 'completed') AS earnings, (SELECT ROUND(AVG(r.rating), 1) FROM REVIEWS r WHERE r.freelancer_id = :id) AS rating, (SELECT COUNT(DISTINCT s.id) FROM SERVICES s JOIN BOOKINGS b ON b.service_id = s.id WHERE s.freelancer_id = :id AND b.status = 'pending') AS active;", nativeQuery = true)
    Map<String, Object> getFreelancerDashboardDetails(@Param("id") Integer id);

    @Query(value = "SELECT * FROM SERVICES WHERE freelancer_id = :id", nativeQuery = true)
    List<Map<String, Object>> getFreelancerServiceDetails(Integer id);
}

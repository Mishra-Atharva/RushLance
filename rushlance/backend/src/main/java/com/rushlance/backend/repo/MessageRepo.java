package com.rushlance.backend.repo;

import com.rushlance.backend.model.Messages;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepo extends JpaRepository<Messages, Integer> {

    @Query(value="SELECT * FROM messages", nativeQuery=true)
    List<Messages> getAll();

    @Query(value = "SELECT * FROM messages WHERE booking_id = :id", nativeQuery = true)
    List<Messages> getByBookingId(@Param("id") Integer id);

    @Query(value = "SELECT sender.id AS sender_id, receiver.id AS receiver_id FROM users AS sender, users AS receiver WHERE sender.email = :email AND receiver.full_name = :r_name;", nativeQuery = true)
    Map<String, Object> getDetails(@Param("r_name") String r_name, @Param("email") String email);
}

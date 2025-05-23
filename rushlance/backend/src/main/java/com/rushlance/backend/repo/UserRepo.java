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
}

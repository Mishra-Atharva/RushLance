package com.rushlance.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.rushlance.backend.model.Services;

import java.util.List;

@Repository
public interface ServiceRepo extends JpaRepository<Services, Long>
{
    @Query(value = "SELECT * FROM services", nativeQuery = true)
    List<Services> getAll();

    @Query(value = "DELETE FROM services WHERE id = :id", nativeQuery = true)
    void deleteService(@Param("id") Integer id);
}

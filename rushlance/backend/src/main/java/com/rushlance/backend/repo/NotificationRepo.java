package com.rushlance.backend.repo;
import com.rushlance.backend.model.Messages;
import com.rushlance.backend.model.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notifications, Integer>{
    @Query(value="SELECT * FROM notifications", nativeQuery=true)
    List<Notifications> getAll();

    @Query(value = "SELECT * FROM notifications WHERE user_id = (SELECT id FROM USERS WHERE email = :email);", nativeQuery = true)
    List<Notifications> getNotifcations(@Param("email") String email);
}

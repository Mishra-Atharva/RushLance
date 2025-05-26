package com.rushlance.backend.repo;
import java.util.List;

import com.rushlance.backend.model.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepo extends JpaRepository<Transactions, Integer> {
    @Query(value="SELECT * FROM transactions", nativeQuery=true)
    List<Transactions> getAll();

    @Query(value = "INSERT INTO transactions ( booking_id, freelancer_id, client_id, service_id, amount, platform_fee, payment_status, payment_method ) SELECT b.id AS booking_id, f.id AS freelancer_id, c.id AS client_id, s.id AS service_id, s.price AS amount, ROUND(s.price * 0.10, 2) AS platform_fee, 'completed' AS payment_status, 'credit_card' AS payment_method FROM users c JOIN users f ON f.full_name = :f_name AND f.user_type = 'freelancer' JOIN bookings b ON b.client_id = c.id AND b.freelancer_id = f.id JOIN services s ON s.id = b.service_id AND s.freelancer_id = f.id WHERE c.full_name = :c_name AND c.user_type = 'client' AND NOT EXISTS ( SELECT 1 FROM transactions t WHERE t.booking_id = b.id ) LIMIT 1;", nativeQuery = true)
    void addTransaction(@Param("c_name") String c_name, @Param("f_name") String f_name);

    @Query(value = "UPDATE bookings SET status = 'completed' WHERE id = ( SELECT b.id FROM bookings b JOIN users c ON c.id = b.client_id JOIN users f ON f.id = b.freelancer_id WHERE c.full_name = :c_name AND f.full_name = :f_name ORDER BY b.id DESC LIMIT 1 );", nativeQuery = true)
    void updateMoney(@Param("c_name") String c_name, @Param("f_name") String f_name);

    @Query(value = "INSERT INTO notifications (user_id, message, created_at, is_read) SELECT * FROM ( SELECT c.id AS user_id, CONCAT('Payment of $', s.price, ' to ', f.full_name, ' completed successfully.') AS message, NOW() AS created_at, FALSE AS is_read FROM users c JOIN users f ON f.full_name = :f_name AND f.user_type = 'freelancer' JOIN bookings b ON b.client_id = c.id AND b.freelancer_id = f.id JOIN services s ON s.id = b.service_id AND s.freelancer_id = f.id WHERE c.full_name = :c_name AND c.user_type = 'client' UNION ALL SELECT f.id AS user_id, CONCAT('You have received a payment of $', s.price, ' from ', c.full_name, '.') AS message, NOW() AS created_at, FALSE AS is_read FROM users c JOIN users f ON f.full_name = :f_name AND f.user_type = 'freelancer' JOIN bookings b ON b.client_id = c.id AND b.freelancer_id = f.id JOIN services s ON s.id = b.service_id AND s.freelancer_id = f.id WHERE c.full_name = :c_name AND c.user_type = 'client' ) AS notifications_data ORDER BY user_id LIMIT 2;", nativeQuery = true)
    void sendNotification(@Param("c_name") String c_name, @Param("f_name") String f_name);
}

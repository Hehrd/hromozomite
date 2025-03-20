package org.example.persistence.repository;

import org.example.persistence.model.SessionEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface SessionRepository extends BaseRepository<SessionEntity> {
    boolean existsBySessionString(String sessionString);
    Optional<SessionEntity> findBySessionString(String sessionString);

    @Query("SELECT p FROM Payment p WHERE p.user.sessionString = :sessionString AND p.date BETWEEN :startDate AND :endDate")
    List<Payment> findPaymentsByUserAndDateRange(String sessionString, LocalDate startDate, LocalDate endDate);

}

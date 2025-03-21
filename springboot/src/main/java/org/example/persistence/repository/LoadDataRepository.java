package org.example.persistence.repository;

import org.example.controller.model.SinglePaymentDTO;
import org.example.persistence.model.SinglePaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface LoadDataRepository extends JpaRepository<SinglePaymentEntity, Long> {
    Optional<SinglePaymentEntity> findById(Long id);
    List<SinglePaymentEntity> findByDateBetween(Date startDate, Date endDate);
}

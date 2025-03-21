package org.example.persistence.repository;

import com.stripe.v2.Amount;
import org.example.controller.model.SinglePaymentDTO;
import org.example.persistence.model.SinglePaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface LoadDataRepository extends JpaRepository<SinglePaymentEntity, Long> {
    Optional<SinglePaymentEntity> findById(Long id);
    List<SinglePaymentEntity> findByDateBetween(Date startDate, Date endDate);
    List<SinglePaymentEntity> findByUserIdOrderByTransactionDateDesc(Long amount, Pageable pageable);
}

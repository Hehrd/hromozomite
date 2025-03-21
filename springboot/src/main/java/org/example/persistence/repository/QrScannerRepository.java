package org.example.persistence.repository;

import org.example.persistence.model.SinglePaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QrScannerRepository extends JpaRepository<SinglePaymentEntity, Long> {

}

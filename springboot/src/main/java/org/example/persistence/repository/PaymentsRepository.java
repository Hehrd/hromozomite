package org.example.persistence.repository;

import org.example.persistence.model.PaymentsEntity;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentsRepository extends BaseRepository<PaymentsEntity>{
    Optional<List<PaymentsEntity>> findByDateAfter(LocalDate date);
}

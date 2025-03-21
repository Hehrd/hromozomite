package org.example.persistence.repository;

import org.example.persistence.model.PaymentsForADayEntity;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentsForADayRepository extends BaseRepository<PaymentsForADayEntity>{
    Optional<List<PaymentsForADayEntity>> findByDateAfter(LocalDate date);
}

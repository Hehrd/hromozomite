package org.example.persistence.repository;

import org.example.persistence.model.TransactionEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends BaseRepository<TransactionEntity>{
    Optional<List<TransactionEntity>> findAllByUser_Id(Long userId);
}

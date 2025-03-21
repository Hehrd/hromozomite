package org.example.persistence.repository;

import org.example.persistence.model.TransactionEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends BaseRepository<TransactionEntity>{
}

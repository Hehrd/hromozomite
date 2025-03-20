package org.example.persistence.repository;

import org.example.persistence.model.SessionEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepository extends BaseRepository<SessionEntity> {
    boolean existsBySessionString(String sessionString);
    Optional<SessionEntity> findBySessionString(String sessionString);
}

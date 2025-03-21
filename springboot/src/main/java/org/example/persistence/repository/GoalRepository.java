package org.example.persistence.repository;

import org.example.persistence.model.GoalEntity;

import java.util.Optional;

public interface GoalRepository extends BaseRepository<GoalEntity>{
    Optional<GoalEntity> findByUser_id(Long userId);
}

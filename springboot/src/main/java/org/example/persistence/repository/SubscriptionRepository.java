package org.example.persistence.repository;

import org.example.persistence.model.SubscriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionRepository extends BaseRepository<SubscriptionEntity> {
    Optional<SubscriptionEntity> findByName(String name);
}

package org.example.persistence.repository;

import org.example.persistence.model.SubscriptionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends BaseRepository<SubscriptionEntity> {
    Optional<SubscriptionEntity> findByNameAndUser_Id(String name, Long userId);
    void deleteByName(String name);
    void deleteByNameAndUser_Id(String name, Long userId);
    List<SubscriptionEntity> findAllByUser_Id(Long userId);
//    Page<SubscriptionEntity> findByUser_IdAndNameContainingIgnoreCase(Long userId, String name, Pageable pageable);
}

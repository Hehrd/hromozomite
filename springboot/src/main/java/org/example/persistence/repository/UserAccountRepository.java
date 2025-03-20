package org.example.persistence.repository;

import org.example.persistence.model.UserAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository extends BaseRepository<UserAccountEntity> {
    Optional<UserAccountEntity> findByEmailAndPassword(String username, String password);
    Optional<UserAccountEntity> findBySession_SessionString(String sessionString);
}


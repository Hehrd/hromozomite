package org.example.service;

import org.example.persistence.model.SessionEntity;
import org.example.persistence.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SessionService {
    @Autowired
    private SessionRepository sessionRepository;

    public SessionEntity createSession(){
        SessionEntity sessionEntity = new SessionEntity();
        UUID uuid = UUID.randomUUID();
        sessionEntity.setSessionString(uuid.toString());
        sessionEntity.setExpirationDateInMillis(System.currentTimeMillis() + 15 * 60 * 1000);
        return sessionEntity;
    }
}

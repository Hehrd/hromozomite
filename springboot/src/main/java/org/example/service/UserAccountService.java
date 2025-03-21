package org.example.service;

import org.example.controller.model.UserCredentialsDTO;
import org.example.exception.EmailAlreadyInUseException;
import org.example.exception.UserNotFoundException;
import org.example.persistence.model.SessionEntity;
import org.example.persistence.model.UserAccountEntity;
import org.example.persistence.repository.SessionRepository;
import org.example.persistence.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private SessionService sessionService;

    public void signup(UserCredentialsDTO userCredentialsDTO) throws EmailAlreadyInUseException {
        if (userAccountRepository.existsByEmail(userCredentialsDTO.getEmail())) {
            throw new EmailAlreadyInUseException("Email already in use!");
        }
        UserAccountEntity userAccountEntity = new UserAccountEntity();
        userAccountEntity.setUsername(userCredentialsDTO.getUsername());
        userAccountEntity.setPassword(userCredentialsDTO.getPassword());
        userAccountEntity.setEmail(userCredentialsDTO.getEmail());
        userAccountRepository.save(userAccountEntity);
    }

    public String login(UserCredentialsDTO userCredentialsDTO) throws UserNotFoundException {
        String email = userCredentialsDTO.getEmail();
        String password = userCredentialsDTO.getPassword();
        UserAccountEntity userAccountEntity = userAccountRepository.findByEmailAndPassword(email, password).orElseThrow(()-> new UserNotFoundException("User not found!"));
        SessionEntity sessionEntity = sessionService.createSession();
        userAccountEntity.setSession(sessionEntity);
        userAccountRepository.save(userAccountEntity);
        return sessionEntity.getSessionString();
    }
    public void logout(String sessionString){
        SessionEntity sessionEntity = sessionRepository.findBySessionString(sessionString).orElse(null);
        if (sessionEntity != null) {
            sessionRepository.delete(sessionEntity);
        }
    }
}

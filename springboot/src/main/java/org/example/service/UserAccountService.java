package org.example.service;

import lombok.Data;
import org.example.controller.model.UserCredentialsDTO;
import org.example.persistence.model.UserAccountEntity;
import org.example.persistence.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    public void signup(UserCredentialsDTO userCredentialsDTO) {
        UserAccountEntity userAccountEntity = new UserAccountEntity();
        userAccountEntity.setUsername(userAccountEntity.getUsername());
        userAccountEntity.setPassword(userAccountEntity.getPassword());
        userAccountEntity.setEmail(userAccountEntity.getEmail());
        userAccountRepository.save(userAccountEntity);
    }

    public void login(UserCredentialsDTO userCredentialsDTO){
        String email = userCredentialsDTO.getEmail();
        String password = userCredentialsDTO.getPassword();
        UserAccountEntity userAccountEntity = userAccountRepository.findByEmailAndPassword(email, password).orElse(null);

        if (userAccountEntity == null) {
            throw new RuntimeException("No user found with the provided credentials.");
        }

    }
    public void logout(){

    }
}

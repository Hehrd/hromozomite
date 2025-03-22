package org.example.service;

import org.example.controller.model.SubscriptionDTO;
import org.example.persistence.model.SubscriptionEntity;
import org.example.persistence.model.UserAccountEntity;
import org.example.persistence.repository.SubscriptionRepository;
import org.example.persistence.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    public void saveSubscription(SubscriptionDTO SubscriptionDTO, String sessionString) {
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString).orElse(null);
        SubscriptionEntity subscriptionEntity = new SubscriptionEntity();
        subscriptionEntity.setName(SubscriptionDTO.getName());
        subscriptionEntity.setAmount(SubscriptionDTO.getAmount());
        subscriptionEntity.setCurrency(SubscriptionDTO.getCurrency());
        subscriptionEntity.setUser(userAccountEntity);
        subscriptionRepository.save(subscriptionEntity);
    }

    public void deleteSubscription(String name, String sessionString) {
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString).orElse(null);
        SubscriptionEntity subscriptionEntity = subscriptionRepository.findByNameAndUser_Id(name, userAccountEntity.getId()).orElse(null);
        subscriptionRepository.delete(subscriptionEntity);
    }

    public List<SubscriptionDTO> getSubscriptions(String sessionString) {
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString).orElse(null);
        List<SubscriptionEntity> subscriptionEntities = subscriptionRepository.findAllByUser_Id(userAccountEntity.getId());
        List<SubscriptionDTO> subscriptionDTOS = new java.util.ArrayList<>();
        for (SubscriptionEntity subscriptionEntity : subscriptionEntities) {
            SubscriptionDTO subscriptionDTO = new SubscriptionDTO();
            subscriptionDTO.setName(subscriptionEntity.getName());
            subscriptionDTO.setAmount(subscriptionEntity.getAmount());
            subscriptionDTO.setCurrency(subscriptionEntity.getCurrency());
            subscriptionDTOS.add(subscriptionDTO);
        }
        return subscriptionDTOS;
    }

}

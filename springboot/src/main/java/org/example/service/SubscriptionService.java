package org.example.service;

import org.example.controller.model.SubscriptionDTO;
import org.example.persistence.model.SubscriptionEntity;
import org.example.persistence.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public void saveSubscription(SubscriptionDTO SubscriptionDTO) {
        SubscriptionEntity subscriptionEntity = new SubscriptionEntity();
        subscriptionEntity.setName(SubscriptionDTO.getName());
        subscriptionRepository.save(subscriptionEntity);
    }
}

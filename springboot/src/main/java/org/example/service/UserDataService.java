package org.example.service;

import org.example.controller.model.PaymentsDTO;
import org.example.persistence.model.PaymentsEntity;
import org.example.persistence.repository.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDataService {
    @Autowired
    private PaymentsRepository paymentsRepository;

    @Autowired
    private SessionService sessionService;


    public void setPayments(PaymentsDTO paymentsDTO, String sessionString) {
        PaymentsEntity paymentsEntity = new PaymentsEntity();
        paymentsEntity.setId(sessionService.getUserFromSessionString(sessionString).getId());
        paymentsEntity.setP(paymentsDTO.getPayments());
        paymentsEntity.setDate(paymentsDTO.getDate());
    }
}

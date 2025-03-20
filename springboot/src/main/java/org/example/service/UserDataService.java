package org.example.service;

import org.example.controller.model.GoalDTO;
import org.example.controller.model.PaymentsDTO;
import org.example.controller.model.SalaryDTO;
import org.example.exception.UserNotFoundException;
import org.example.persistence.model.GoalEntity;
import org.example.persistence.model.PaymentsEntity;
import org.example.persistence.model.SalaryEntity;
import org.example.persistence.model.UserAccountEntity;
import org.example.persistence.repository.GoalRepository;
import org.example.persistence.repository.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDataService {
    @Autowired
    private PaymentsRepository paymentsRepository;

    @Autowired
    private SessionService sessionService;
    @Autowired
    private GoalRepository goalRepository;


    public void setPayments(PaymentsDTO paymentsDTO, String sessionString) throws UserNotFoundException {
        PaymentsEntity paymentsEntity = new PaymentsEntity();
//        paymentsEntity.setPayments(paymentsDTO.getPayments());
        paymentsEntity.setCurrency(paymentsDTO.getCurrency());
        paymentsEntity.setDate(paymentsDTO.getDate());
        paymentsRepository.save(paymentsEntity);
    }

    public void setGoal(GoalDTO goalDTO, String sessionString) throws UserNotFoundException {
        GoalEntity goalEntity = new GoalEntity();
        goalEntity.setAmount(goalDTO.getAmount());
        goalEntity.setUser(sessionService.getUserFromSessionString(sessionString));
        goalRepository.save(goalEntity);
    }

    public void setSalary(SalaryDTO salaryDTO, String sessionString) throws UserNotFoundException {
        SalaryEntity salaryEntity = new SalaryEntity();
        salaryEntity.setAmount(salaryDTO.getAmount());
        salaryEntity.setUser(sessionService.getUserFromSessionString(sessionString));
    }
}

package org.example.service;

import org.example.controller.model.GoalDTO;
import org.example.controller.model.SinglePaymentDTO;
import org.example.controller.model.SalaryDTO;
import org.example.exception.UserNotFoundException;
import org.example.persistence.model.GoalEntity;
import org.example.persistence.model.PaymentsForADayEntity;
import org.example.persistence.model.SalaryEntity;
import org.example.persistence.repository.GoalRepository;
import org.example.persistence.repository.PaymentsForADayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDataService {
    @Autowired
    private PaymentsForADayRepository paymentsForADayRepository;

    @Autowired
    private SessionService sessionService;
    @Autowired
    private GoalRepository goalRepository;


    public void setPayments(SinglePaymentDTO singlePaymentDTO, String sessionString) throws UserNotFoundException {
        PaymentsForADayEntity paymentsForADayEntity = new PaymentsForADayEntity();
//        paymentsEntity.setPayments(paymentsDTO.getPayments());
        paymentsForADayEntity.setCurrency(singlePaymentDTO.getCurrency());
        paymentsForADayEntity.setDate(singlePaymentDTO.getDate());
        paymentsForADayRepository.save(paymentsForADayEntity);
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

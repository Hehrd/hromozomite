package org.example.service;

import org.example.controller.model.GoalDTO;
import org.example.controller.model.SinglePaymentDTO;
import org.example.controller.model.SalaryDTO;
import org.example.exception.UserNotFoundException;
import org.example.persistence.model.*;
import org.example.persistence.repository.GoalRepository;
import org.example.persistence.repository.PaymentsForADayRepository;
import org.example.persistence.repository.SinglePaymentRepository;
import org.example.persistence.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDataService {
    @Autowired
    private PaymentsForADayRepository paymentsForADayRepository;
    @Autowired
    private SinglePaymentRepository singlePaymentRepository;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private GoalRepository goalRepository;
    @Autowired
    private UserAccountRepository userAccountRepository;

    public void setPayments(SinglePaymentDTO singlePaymentDTO, String sessionString) throws UserNotFoundException {
        SinglePaymentEntity singlePaymentEntity = new SinglePaymentEntity();
//        paymentsEntity.setPayments(paymentsDTO.getPayments());
        singlePaymentEntity.setCurrency(singlePaymentDTO.getCurrency());
        singlePaymentEntity.setDate(singlePaymentDTO.getDate());
        singlePaymentEntity.setAmount(singlePaymentDTO.getAmount());
        singlePaymentEntity.setUser(sessionService.getUserFromSessionString(sessionString));
        singlePaymentRepository.save(singlePaymentEntity);
    }

    public void setGoal(GoalDTO goalDTO, String sessionString) throws UserNotFoundException {
        GoalEntity goalEntity = goalRepository.findByUser_id(userAccountRepository.findBySession_SessionString(sessionString)
                .orElseThrow(()-> new UserNotFoundException("User not found!")).getId()).orElse(new GoalEntity());
        goalEntity.setAmount(goalDTO.getAmount());
        goalEntity.setUser(sessionService.getUserFromSessionString(sessionString));
        goalRepository.save(goalEntity);
    }

    public void setSalary(SalaryDTO salaryDTO, String sessionString) throws UserNotFoundException {

        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString).orElseThrow(()-> new UserNotFoundException("User not found!"));
        if (userAccountEntity.getSalary() == null) {
            userAccountEntity.setSalary(new SalaryEntity());
        }
        userAccountEntity.getSalary().setAmount(salaryDTO.getAmount());
        userAccountEntity.getSalary().setCurrency(salaryDTO.getCurrency());
        userAccountRepository.save(userAccountEntity);
    }
}

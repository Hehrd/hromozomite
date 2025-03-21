package org.example.service;

import org.example.exception.UserNotFoundException;
import org.example.persistence.model.PaymentsForADayEntity;
import org.example.persistence.model.UserAccountEntity;
import org.example.persistence.repository.PaymentsForADayRepository;
import org.example.persistence.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentStatisticsService {

    @Autowired
    private PaymentsForADayRepository paymentsForADayRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    public List<Integer> calculateWeeklyStatistics(String sessionString) throws UserNotFoundException {
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString).orElseThrow(()-> new UserNotFoundException("User not found"));
        LocalDate today = LocalDate.now();
        LocalDate startOfLastWeek = today.minus(7, ChronoUnit.DAYS);

        List<PaymentsForADayEntity> payments = paymentsForADayRepository.findByDateBetweenAndUserAccount_Id(startOfLastWeek, today, userAccountEntity.getId()).orElseThrow(() -> new RuntimeException());
        List<Integer> amounts = new ArrayList<>();
        for (PaymentsForADayEntity payment : payments) {
            amounts.add(payment.getAmount());
        }
//        for (PaymentsEntity payment : payments) {
//            if (payment.getDate().isAfter(startOfLastWeek) && payment.getDate().isBefore(today)) {
//                payment.getPayments().forEach((description, amount) -> {
//                    weeklySpending.merge(description, amount, Integer::sum);
//                });
//            }
//        }

        return amounts;
    }
}
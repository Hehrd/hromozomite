package org.example.service;

import org.example.persistence.model.PaymentsForADayEntity;
import org.example.persistence.repository.PaymentsForADayRepository;
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

    public List<Integer> calculateWeeklyStatistics() {
        LocalDate today = LocalDate.now();
        LocalDate startOfLastWeek = today.minus(7, ChronoUnit.DAYS);

        List<PaymentsForADayEntity> payments = paymentsForADayRepository.findByDateAfter(startOfLastWeek).orElseThrow(() -> new RuntimeException());
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
package org.example.service;

import org.example.controller.model.PaymentsDTO;
import org.example.persistence.model.PaymentsEntity;
import org.example.persistence.repository.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentStatisticsService {

    @Autowired
    private PaymentsRepository paymentsRepository;

    public Map<String, Integer> calculateWeeklyStatistics() {
        LocalDate today = LocalDate.now();
        LocalDate startOfLastWeek = today.minus(7, ChronoUnit.DAYS);

        Map<String, Integer> weeklySpending = new HashMap<>();
        List<PaymentsEntity> payments = paymentsRepository.findByDateAfter(startOfLastWeek).orElseThrow(() -> new RuntimeException());
//        for (PaymentsEntity payment : payments) {
//            if (payment.getDate().isAfter(startOfLastWeek) && payment.getDate().isBefore(today)) {
//                payment.getPayments().forEach((description, amount) -> {
//                    weeklySpending.merge(description, amount, Integer::sum);
//                });
//            }
//        }

        return weeklySpending;
    }
}
package org.example.service;

import org.example.controller.model.PaymentsDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentStatisticsService {

    public Map<String, Integer> calculateWeeklyStatistics(List<PaymentsDTO> payments) {
        LocalDate today = LocalDate.now();
        LocalDate startOfLastWeek = today.minus(7, ChronoUnit.DAYS);

        Map<String, Integer> weeklySpending = new HashMap<>();

        for (PaymentsDTO payment : payments) {
            if (payment.getDate().isAfter(startOfLastWeek) && payment.getDate().isBefore(today)) {
                payment.getPayments().forEach((description, amount) -> {
                    weeklySpending.merge(description, amount, Integer::sum);
                });
            }
        }

        return weeklySpending;
    }
}
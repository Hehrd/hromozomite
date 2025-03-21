package org.example.service;

import org.example.controller.model.PaymentsForADayDTO;
import org.example.exception.UserNotFoundException;
import org.example.persistence.model.SinglePaymentEntity;
import org.example.persistence.model.UserAccountEntity;
import org.example.persistence.repository.PaymentsForADayRepository;
import org.example.persistence.repository.SinglePaymentRepository;
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
    private SinglePaymentRepository singlePaymentRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    public List<PaymentsForADayDTO> calculateWeeklyStatistics(String sessionString) throws UserNotFoundException {
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        LocalDate today = LocalDate.now();
        LocalDate startOfLastWeek = today.minus(7, ChronoUnit.DAYS);

        List<SinglePaymentEntity> payments = singlePaymentRepository.findPaymentsByDateRangeAndUserId(
                        startOfLastWeek, today.plusDays(1), userAccountEntity.getId())
                .orElseThrow(() -> new RuntimeException("No payments found for the user"));

        if (payments.isEmpty()) {
            return new ArrayList<>();
        }

        List<PaymentsForADayDTO> paymentsForADayDTOList = new ArrayList<>();
        LocalDate currentDate = payments.get(0).getDate();
        PaymentsForADayDTO currentDTO = new PaymentsForADayDTO();
        currentDTO.setDate(currentDate);
        currentDTO.setAmount(0L);

        for (SinglePaymentEntity payment : payments) {
            if (!currentDate.isEqual(payment.getDate())) {
                paymentsForADayDTOList.add(currentDTO);
                currentDate = payment.getDate();
                currentDTO = new PaymentsForADayDTO();
                currentDTO.setDate(currentDate);
                currentDTO.setAmount(0L);
            }
            currentDTO.setAmount(currentDTO.getAmount() + payment.getAmount());
        }

        paymentsForADayDTOList.add(currentDTO);

        return paymentsForADayDTOList;
    }
}
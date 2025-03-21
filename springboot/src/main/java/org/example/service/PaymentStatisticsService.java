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
        // Fetch the user details based on the session string
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Define the date range for the last 7 days
        LocalDate today = LocalDate.now();
        LocalDate startOfLastWeek = today.minus(7, ChronoUnit.DAYS);

        // Fetch payments from the repository
        List<SinglePaymentEntity> payments = singlePaymentRepository.findPaymentsByDateRangeAndUserId(
                        startOfLastWeek, today.plusDays(1), userAccountEntity.getId())
                .orElseThrow(() -> new RuntimeException("No payments found for the user"));

        // If no payments exist, return an empty list
        if (payments.isEmpty()) {
            return new ArrayList<>();
        }

        // Prepare the result list
        List<PaymentsForADayDTO> paymentsForADayDTOList = new ArrayList<>();
        LocalDate currentDate = payments.get(0).getDate(); // Start with the date of the first payment
        PaymentsForADayDTO currentDTO = new PaymentsForADayDTO();
        currentDTO.setDate(currentDate);
        currentDTO.setAmount(0L);

        for (SinglePaymentEntity payment : payments) {
            // If the payment date changes, finalize the current DTO and start a new one
            if (!currentDate.isEqual(payment.getDate())) {
                paymentsForADayDTOList.add(currentDTO); // Add the finalized DTO to the list
                currentDate = payment.getDate();       // Update the current working date
                currentDTO = new PaymentsForADayDTO(); // Create a new DTO for the new date
                currentDTO.setDate(currentDate);
                currentDTO.setAmount(0L);
            }
            // Accumulate the payment amount for the current date
            currentDTO.setAmount(currentDTO.getAmount() + payment.getAmount());
        }

        // Add the last DTO to the list
        paymentsForADayDTOList.add(currentDTO);

        return paymentsForADayDTOList;
    }
}
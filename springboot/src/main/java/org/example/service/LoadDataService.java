package org.example.service;

import org.example.controller.model.SinglePaymentDTO;
import org.example.persistence.model.SinglePaymentEntity;
import org.example.persistence.model.UserAccountEntity;
import org.example.persistence.repository.LoadDataRepository;
import org.example.persistence.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoadDataService {

    @Autowired
    private LoadDataRepository loadDataRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    public List<SinglePaymentDTO> getPaymentsBetween(Date startDate, Date endDate) {
        List<SinglePaymentEntity> payments = loadDataRepository.findByDateBetween(startDate, endDate);

        return payments.stream()
                .map(payment -> new SinglePaymentDTO(payment.getAmount(), payment.getDate()))
                .collect(Collectors.toList());
        }

    public List<SinglePaymentDTO> getLastTransactions(String sessionString) {
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString).orElseThrow(()-> new RuntimeException("User not found!"));
        return loadDataRepository.findByUserIdOrderByTransactionDateDesc(userAccountEntity.getId(), PageRequest.of(0, 3))
                .stream()
                .map(entity -> new SinglePaymentDTO(entity.getAmount(), entity.getDate()))
                .collect(Collectors.toList());
    }
}
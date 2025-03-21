package org.example.service;

import org.example.controller.model.SinglePaymentDTO;
import org.example.persistence.model.SinglePaymentEntity;
import org.example.persistence.repository.LoadDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoadDataService {

    @Autowired
    private LoadDataRepository loadDataRepository;

    public List<SinglePaymentDTO> getPaymentsBetween(Date startDate, Date endDate) {
        List<SinglePaymentEntity> payments = loadDataRepository.findByDateBetween(startDate, endDate);

        return payments.stream()
                .map(payment -> new SinglePaymentDTO(payment.getAmount(), payment.getDate()))
                .collect(Collectors.toList());
        }
    }
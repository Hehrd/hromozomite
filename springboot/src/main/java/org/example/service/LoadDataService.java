package org.example.service;

import com.stripe.service.tax.TransactionService;
import org.example.controller.model.SinglePaymentDTO;
import org.example.exception.UserNotFoundException;
import org.example.persistence.model.SinglePaymentEntity;
import org.example.persistence.model.TransactionEntity;
import org.example.persistence.model.UserAccountEntity;
//import org.example.persistence.repository.LoadDataRepository;
import org.example.persistence.repository.SinglePaymentRepository;
import org.example.persistence.repository.TransactionRepository;
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

//    @Autowired
//    private LoadDataRepository loadDataRepository;

    @Autowired
    private SinglePaymentRepository singlePaymentRepository;
    @Autowired
    private UserAccountRepository userAccountRepository;
    @Autowired
    private TransactionRepository transactionRepository;


//    public List<SinglePaymentDTO> getPaymentsBetween(LocalDate startDate, LocalDate endDate) {
//        List<SinglePaymentEntity> payments = singlePaymentRepository.findByDateBetweenAndUser_Id(startDate, endDate, 5L).orElseThrow(() -> new RuntimeException());
//
//    }

    public List<SinglePaymentDTO> getPaymentsByDate(LocalDate date, String sessionString) throws UserNotFoundException {
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString).orElseThrow(() -> new UserNotFoundException("User not found!"));
        List<SinglePaymentDTO> singlePaymentDTOS = new java.util.ArrayList<>();
        for (SinglePaymentEntity singlePaymentEntity : singlePaymentRepository.findByDateAndUser_Id(date, userAccountEntity.getId()).orElseThrow(() -> new RuntimeException())) {
            SinglePaymentDTO singlePaymentDTO = new SinglePaymentDTO();
            singlePaymentDTO.setAmount(singlePaymentEntity.getAmount());
            singlePaymentDTO.setDate(singlePaymentEntity.getDate());
            singlePaymentDTO.setCurrency(singlePaymentEntity.getCurrency());
            singlePaymentDTOS.add(singlePaymentDTO);
        }
        return singlePaymentDTOS;
    }

    public List<SinglePaymentDTO> getLastTransactions(String sessionString) {
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString).orElseThrow(() -> new RuntimeException("User not found!"));
        List<SinglePaymentEntity> singlePaymentEntities = singlePaymentRepository.findLastThreePaymentsByUserId(userAccountEntity.getId());
        List<SinglePaymentDTO> singlePaymentDTOS = new java.util.ArrayList<>();
        for (int i = 0; i < 3; i++) {
            SinglePaymentEntity singlePaymentEntity = singlePaymentEntities.get(i);
            SinglePaymentDTO singlePaymentDTO = new SinglePaymentDTO();
            singlePaymentDTO.setAmount(singlePaymentEntity.getAmount());
            singlePaymentDTO.setDate(singlePaymentEntity.getDate());
            singlePaymentDTO.setCurrency(singlePaymentEntity.getCurrency());
            singlePaymentDTOS.add(singlePaymentDTO);
        }

        return singlePaymentDTOS;
    }

    public List<SinglePaymentDTO> getTransactions(String sessionString) {
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString).orElseThrow(() -> new RuntimeException("User not found!"));
        List<SinglePaymentEntity> singlePaymentEntities = singlePaymentRepository.findLastThreePaymentsByUserId(userAccountEntity.getId());
        List<SinglePaymentDTO> singlePaymentDTOS = new java.util.ArrayList<>();
        for (SinglePaymentEntity singlePaymentEntity : singlePaymentEntities) {
            SinglePaymentDTO singlePaymentDTO = new SinglePaymentDTO();
            singlePaymentDTO.setAmount(singlePaymentEntity.getAmount());
            singlePaymentDTO.setDate(singlePaymentEntity.getDate());
            singlePaymentDTO.setCurrency(singlePaymentEntity.getCurrency());
            singlePaymentDTOS.add(singlePaymentDTO);
        }

        return singlePaymentDTOS;
    }

    public Long getBalance(String sessionString) throws UserNotFoundException {
        UserAccountEntity userAccountEntity = userAccountRepository.findBySession_SessionString(sessionString).orElseThrow(() -> new UserNotFoundException("User not found!"));
        List<TransactionEntity> transactionEntities = transactionRepository.findAllByUser_Id(userAccountEntity.getId()).orElseThrow(() -> new RuntimeException("User not found!"));
        Long balance = 0L;
        for (TransactionEntity transactionEntity : transactionEntities) {
            balance += transactionEntity.getAmount();
        }
        return balance;
    }
}
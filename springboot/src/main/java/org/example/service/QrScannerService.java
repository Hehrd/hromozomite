package org.example.service;

import org.example.controller.model.QrScannerDTO;
import org.example.persistence.model.SinglePaymentEntity;
import org.example.persistence.repository.QrScannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QrScannerService {

    @Autowired
    private QrScannerRepository qrScannerRepository;

    public void qrScannerSave(QrScannerDTO qrScannerDTO) {
        SinglePaymentEntity singlePaymentEntity = new SinglePaymentEntity();
        singlePaymentEntity.setAmount(qrScannerDTO.getAmount());
        singlePaymentEntity.setDate(qrScannerDTO.getDate());
        qrScannerRepository.save(singlePaymentEntity);
    }
}

package org.example.controller.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SinglePaymentDTO {
    private Long amount;
    private String currency;
    private LocalDate date;
    private String tokenId;
}

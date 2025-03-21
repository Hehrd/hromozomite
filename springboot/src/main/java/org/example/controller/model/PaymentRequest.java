package org.example.controller.model;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long amount;      // in cents
    private String currency;
}

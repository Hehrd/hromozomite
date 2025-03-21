package org.example.controller.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class SinglePaymentDTO {
    private Long amount;
    private String currency;
    private LocalDate date;

    public SinglePaymentDTO(long amount, LocalDate date) {
        this.amount = amount;
        this.date = date;
    }
}
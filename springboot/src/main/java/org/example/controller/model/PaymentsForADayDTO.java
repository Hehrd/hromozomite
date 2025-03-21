package org.example.controller.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PaymentsForADayDTO {
    private Long amount;
    private LocalDate date;
    private String category;
}

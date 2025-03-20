package org.example.controller.model;

import lombok.Data;

import java.time.LocalDate;
import java.util.Map;

@Data
public class PaymentsDTO {
    private Map<String, Integer> payments;
    private String currency;
    private LocalDate date;
}

package org.example.controller.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class QrScannerDTO {
    private int amount;
    private LocalDate date;
}

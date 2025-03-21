package org.example.controller.model;

import lombok.Data;

@Data
public class SubscriptionDTO {
    private String name;
    private Long amount;
    private String currency;
}

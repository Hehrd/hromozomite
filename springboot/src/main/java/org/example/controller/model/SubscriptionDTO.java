package org.example.controller.model;

import lombok.Data;

@Data
public class SubscriptionDTO {
    private String name;
    private int amount;
    private String currency;
}

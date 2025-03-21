package org.example.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "single_payment_table")
public class SinglePaymentEntity extends BaseEntity{
    @Column
    private int amount;
    @Column
    private String currency;
    @Column
    private String description;
}

package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "single_payment_table")
public class SinglePaymentEntity extends BaseEntity{
    @Column
    private int amount;
    @Column
    private String currency;
    @Column
    private LocalDate date;
    @Column
    private String description;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", name = "userId")
    private UserAccountEntity user;
}

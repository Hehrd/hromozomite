package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "transaction_table")
@Data
public class TransactionEntity extends BaseEntity{
    @Column
    private Long amount;

    @Column
    private String currency;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", name = "userId")
    private UserAccountEntity user;
}

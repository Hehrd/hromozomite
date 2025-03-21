package org.example.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "transaction_table")
@Data
public class TransactionEntity extends BaseEntity{
    @Column
    private Long amount;

    @Column
    private String currency;

    @JoinColumn(referencedColumnName = "id", name = "userId")
    private Long userId;
}

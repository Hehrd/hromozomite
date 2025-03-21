package org.example.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "subscription_table")
@Data
public class SubscriptionEntity extends BaseEntity {

    @Column
    private String name;

    @Column
    private Long amount;

    @Column
    private String currency;
}

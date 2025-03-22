package org.example.persistence.model;

import jakarta.persistence.*;
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

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserAccountEntity user;
}

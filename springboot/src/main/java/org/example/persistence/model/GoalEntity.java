package org.example.persistence.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CollectionId;

@Table(name = "goal_table")
public class GoalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int amount;

    @JoinColumn
    private UserAccountEntity userAccount;
}

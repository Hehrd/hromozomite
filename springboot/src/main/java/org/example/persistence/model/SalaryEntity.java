package org.example.persistence.model;

import jakarta.persistence.*;

//@Entity
@Table(name = "salary_table")
public class SalaryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int salary;

    @JoinColumn
    private UserAccountEntity userAccount;
}

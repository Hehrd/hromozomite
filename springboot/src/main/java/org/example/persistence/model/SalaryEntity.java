package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "salary_table")
@Data
public class SalaryEntity extends BaseEntity{

    @Column
    private int amount;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserAccountEntity user;
}

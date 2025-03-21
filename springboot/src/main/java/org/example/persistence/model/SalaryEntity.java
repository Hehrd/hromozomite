package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "salary_table")
@Data
public class SalaryEntity extends BaseEntity{

    @Column
    private Long amount;

    @Column
    private String currency;
}

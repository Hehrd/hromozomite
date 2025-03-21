package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_account_table")
@Data
@NoArgsConstructor
public class UserAccountEntity extends BaseEntity {
    @Column
    private String username;

    @Column
    private String password;

    @Column(unique = true)
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "salaryId", referencedColumnName = "id")
    private SalaryEntity salary;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sessionId", referencedColumnName = "id", nullable = true)
    private SessionEntity session;
}


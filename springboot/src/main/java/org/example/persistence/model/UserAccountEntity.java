package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_account")
@Data
public class UserAccountEntity extends BaseEntity {
    @Column
    private String username;

    @Column
    private String password;

    @Column
    private String email;
}


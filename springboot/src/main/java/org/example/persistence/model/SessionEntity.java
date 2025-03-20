package org.example.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "session_table")
@Data
public class SessionEntity extends BaseEntity {

    @Column(unique = true)
    private String sessionString;

    @Column
    private Long expirationDateInMillis;
}

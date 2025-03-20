package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.util.Date;
import java.util.Map;

//@Entity
//@Data
public class PaymentsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Column
    private Map<String, Integer> payments;

    @Column
    private Date date;

    @JoinColumn
    private UserAccountEntity userAccount;
}

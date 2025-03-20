package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.util.Date;
import java.util.Map;

//@Entity
@Data
public class PaymentsEntity extends BaseEntity{

    //@Column
    private Map<String, Integer> p;

    @Column
    private Date date;

    @JoinColumn
    private UserAccountEntity userAccount;
}

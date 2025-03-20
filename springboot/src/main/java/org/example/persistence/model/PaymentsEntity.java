package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.time.LocalDate;
import java.util.Date;
import java.util.Map;

@Entity
@Table(name = "payments_table")
@Data
public class PaymentsEntity extends BaseEntity{

//    @ElementCollection
//    @CollectionTable(name = "payments_mapping", joinColumns = @JoinColumn(name = "entity_id"))
//    @MapKeyColumn(name = "payment_key") // Column for the map's keys
//    @Column(name = "payment_value") // Column for the map's values
//    private Map<String, Integer> payments;

    @Column
    private String currency;

    @Column
    private LocalDate date;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserAccountEntity userAccount;
}

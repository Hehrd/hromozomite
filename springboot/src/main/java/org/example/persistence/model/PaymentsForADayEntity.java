package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "payments_table")
@Data
public class PaymentsForADayEntity extends BaseEntity{

//    @ElementCollection
//    @CollectionTable(name = "payments_mapping", joinColumns = @JoinColumn(name = "entity_id"))
//    @MapKeyColumn(name = "payment_key") // Column for the map's keys
//    @Column(name = "payment_value") // Column for the map's values
//    private Map<String, Integer> payments;

    @Column
    private Long amount;

    @Column
    private String currency;

    @Column
    private LocalDate date;


//    @JoinTable(
//            name = "single_payment_table",
//            joinColumns = @JoinColumn(name = "paymentsForADayEntityId"),
//            inverseJoinColumns = @JoinColumn(name = "singlePaymentId")
//    )
//    private List<SinglePaymentEntity> payments;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserAccountEntity userAccount;

}

package org.example.persistence.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CollectionId;

@Entity
@Table(name = "goal_table")
@Data
public class GoalEntity extends BaseEntity{

    @Column
    private int amount;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserAccountEntity user;
}

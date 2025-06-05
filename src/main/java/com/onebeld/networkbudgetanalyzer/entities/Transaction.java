package com.onebeld.networkbudgetanalyzer.entities;

import com.onebeld.networkbudgetanalyzer.enums.Operation;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Builder
@Table(name = "transactions")
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private Double amount;

    @NonNull
    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "organization_id", referencedColumnName = "id")
    private Organization organization;

    @ManyToOne
    @JoinColumn(name = "card_id", referencedColumnName = "id")
    private Card card;

    @ManyToOne
    @JoinColumn(name = "bill_id", referencedColumnName = "id")
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "transaction_type_id", referencedColumnName = "id")
    private TransactionType transactionType;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @NonNull
    @Enumerated()
    @JdbcTypeCode(SqlTypes.SMALLINT)
    private Operation operation;
}

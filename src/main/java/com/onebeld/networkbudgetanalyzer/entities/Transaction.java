package com.onebeld.networkbudgetanalyzer.entities;

import com.onebeld.networkbudgetanalyzer.enums.Operation;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private BigDecimal amount;

    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "organization_id", referencedColumnName = "id")
    private Organization organization;

    @ManyToOne
    @JoinColumn(name = "bankAccount", referencedColumnName = "id")
    private BankAccount bankAccount;

    @Enumerated()
    @JdbcTypeCode(SqlTypes.SMALLINT)
    private Operation operation;
}

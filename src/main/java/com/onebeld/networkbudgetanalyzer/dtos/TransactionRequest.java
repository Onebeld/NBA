package com.onebeld.networkbudgetanalyzer.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
public class TransactionRequest {
    private Double amount;
    private Timestamp createdAt;
    private Long organizationId;
    private String billType;
    private Long cardId;
    private Long billId;
    private Long transactionTypeId;
    private String operation;
}

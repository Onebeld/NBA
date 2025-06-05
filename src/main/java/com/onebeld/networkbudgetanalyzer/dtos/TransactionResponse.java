package com.onebeld.networkbudgetanalyzer.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
public class TransactionResponse {
    private Long id;
    private Double amount;
    private Timestamp createdAt;
    private String currency;
    private String transactionType;
    private OrganizationResponse organization;
    private String operation;
}

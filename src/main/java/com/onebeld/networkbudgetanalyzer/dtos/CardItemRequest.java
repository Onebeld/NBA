package com.onebeld.networkbudgetanalyzer.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CardItemRequest {
    private String number;
    private Double initialBalance;
    private String cardType;
    private String holder;
    private String expirationDate;
    private String cvv;
    private Long bank;
}

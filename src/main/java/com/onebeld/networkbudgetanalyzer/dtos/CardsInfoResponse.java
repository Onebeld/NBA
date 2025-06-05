package com.onebeld.networkbudgetanalyzer.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CardsInfoResponse {
    private Double balance;
    private Double income;
    private Double expense;
    private String currency;
}

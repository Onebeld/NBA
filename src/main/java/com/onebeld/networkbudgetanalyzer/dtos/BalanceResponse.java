package com.onebeld.networkbudgetanalyzer.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class BalanceResponse {
    private Double balance;
    private Double income;
    private Double expense;

    private List<Double> incomes;
    private List<Double> expenses;
}

package com.onebeld.networkbudgetanalyzer.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class BillResponse {
    private Double balance;
    private Double billsBalance;
    private Double cardsBalance;
    private String currency;

    private List<BillItemResponse> bills;
    private List<CardItemResponse> cards;
}

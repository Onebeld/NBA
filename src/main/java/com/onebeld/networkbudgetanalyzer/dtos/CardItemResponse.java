package com.onebeld.networkbudgetanalyzer.dtos;

import com.onebeld.networkbudgetanalyzer.entities.Currency;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CardItemResponse {
    private String cardType;
    private String number;
    private String bank;
    private Double amount;
    private Currency currency;
}

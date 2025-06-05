package com.onebeld.networkbudgetanalyzer.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BillItemResponse {
    private String name;
    private String number;
    private String bank;
    private Double amount;
    private String currency;
    private Double rate;
}

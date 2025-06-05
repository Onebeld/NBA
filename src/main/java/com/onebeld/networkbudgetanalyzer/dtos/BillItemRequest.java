package com.onebeld.networkbudgetanalyzer.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BillItemRequest {
    private String name;
    private String number;
    private Long bank;
    private Double initialBalance;
    private Double rate;
    private String holder;
}

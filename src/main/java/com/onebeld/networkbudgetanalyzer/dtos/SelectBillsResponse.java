package com.onebeld.networkbudgetanalyzer.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SelectBillsResponse {
    private SelectBillResponse[] bills;
    private SelectCardResponse[] cards;
}

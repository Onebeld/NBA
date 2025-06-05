package com.onebeld.networkbudgetanalyzer.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class GraphicResponse {
    private List<String> labels;
    private List<Double> data;
}

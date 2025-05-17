package com.onebeld.networkbudgetanalyzer.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "currency")
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private short id;

    @Column(length = 3)
    private String symbol;

    public Currency(String symbol) {
        this.symbol = symbol;
    }

    public Currency() { }
}

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short id;

    @Column(length = 3)
    private String symbol;

    public Currency(short id, String symbol) {
        this.id = id;
        this.symbol = symbol;
    }

    public Currency() {

    }
}

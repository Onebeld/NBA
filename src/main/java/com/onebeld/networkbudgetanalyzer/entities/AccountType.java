package com.onebeld.networkbudgetanalyzer.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "account_type")
public class AccountType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private short id;

    @Column(length = 20)
    private String name;

    public AccountType(String name) {
        this.name = name;
    }

    public AccountType(short id, String name) {
        this.id = id;
        this.name = name;
    }

    public AccountType() {

    }
}

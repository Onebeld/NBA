package com.onebeld.networkbudgetanalyzer.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "account_type")
public class AccountType {
    @Id
    private short id;

    @Column(length = 20)
    private String name;

    public AccountType(short id, String name) {
        this.id = id;
        this.name = name;
    }

    public AccountType() {

    }
}

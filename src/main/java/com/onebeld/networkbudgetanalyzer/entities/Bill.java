package com.onebeld.networkbudgetanalyzer.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@Table(name = "bills")
@AllArgsConstructor
@NoArgsConstructor
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(nullable = false)
    private String name;

    @NonNull
    @Column(nullable = false, length = 20)
    private String number;

    @NonNull
    @Column(nullable = false)
    private Double initialBalance;

    @NonNull
    @Column(nullable = false)
    private Double rate;

    @NonNull
    @Column(nullable = false)
    private String holder;

    @NonNull
    @OneToOne
    @JoinColumn(name = "bank_id")
    private Bank bank;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Transaction> transactions = new ArrayList<>();
}

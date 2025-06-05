package com.onebeld.networkbudgetanalyzer.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onebeld.networkbudgetanalyzer.enums.CardType;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@Table(name = "cards")
@AllArgsConstructor
@NoArgsConstructor
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(nullable = false)
    private String number;

    @NonNull
    @Column(nullable = false)
    private Double initialBalance;

    @NonNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CardType cardType;

    @NonNull
    @Column(nullable = false)
    private String holder;

    @NonNull
    @Column(nullable = false)
    private String expirationDate;

    @NonNull
    @Column(nullable = false)
    private String cvv;

    @NonNull
    @OneToOne
    @JoinColumn(name = "bank_id")
    private Bank bank;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Transaction> transactions = new ArrayList<>();
}

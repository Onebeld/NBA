package com.onebeld.networkbudgetanalyzer.entities;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Table(name = "currency")
@RequiredArgsConstructor
@NoArgsConstructor
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private short id;

    @NonNull
    @Column(length = 3)
    private String name;

    @NonNull
    @Column(length = 1)
    private String symbol;
}

package com.onebeld.networkbudgetanalyzer.entities;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Builder
@Table(name = "currency")
@AllArgsConstructor
@NoArgsConstructor
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;

    @NonNull
    @Column(length = 3)
    private String name;

    @NonNull
    @Column(length = 1)
    private String symbol;
}

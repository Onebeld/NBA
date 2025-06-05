package com.onebeld.networkbudgetanalyzer.entities;

import com.onebeld.networkbudgetanalyzer.enums.ERole;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "roles")
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Short id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @NonNull
    private ERole name;

    @Override
    public String getAuthority() {
        return name.name();
    }
}

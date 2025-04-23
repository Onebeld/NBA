package com.onebeld.networkbudgetanalyzer.repositories;

import com.onebeld.networkbudgetanalyzer.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Short> {
    Role findByName(String name);
}

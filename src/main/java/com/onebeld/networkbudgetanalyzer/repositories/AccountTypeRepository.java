package com.onebeld.networkbudgetanalyzer.repositories;

import com.onebeld.networkbudgetanalyzer.entities.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountTypeRepository extends JpaRepository<AccountType, Short> {
}

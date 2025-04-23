package com.onebeld.networkbudgetanalyzer.repositories;

import com.onebeld.networkbudgetanalyzer.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
}

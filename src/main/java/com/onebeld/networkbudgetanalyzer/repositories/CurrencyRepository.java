package com.onebeld.networkbudgetanalyzer.repositories;

import com.onebeld.networkbudgetanalyzer.entities.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepository extends JpaRepository<Currency, Short> {
}

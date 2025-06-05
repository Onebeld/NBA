package com.onebeld.networkbudgetanalyzer.services.interfaces;

import com.onebeld.networkbudgetanalyzer.entities.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;

public interface BillService {
    Page<Transaction> getTransactions(Long bankAccountId, Pageable pageable);

    BigDecimal getBalance(Long bankAccountId);
}

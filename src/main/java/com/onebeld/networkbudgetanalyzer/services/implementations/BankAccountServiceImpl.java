package com.onebeld.networkbudgetanalyzer.services.implementations;

import com.onebeld.networkbudgetanalyzer.entities.Transaction;
import com.onebeld.networkbudgetanalyzer.repositories.TransactionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class BankAccountServiceImpl {
    private final TransactionRepository transactionRepository;

    public BankAccountServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Page<Transaction> getTransactions(Long bankAccountId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return transactionRepository.findByBankAccountId(bankAccountId, pageable);
    }

    public Optional<BigDecimal> getBalance(Long bankAccountId) {
        Stream<Transaction> transactions = transactionRepository.findAllByBankAccountId(bankAccountId);

        return transactions
                .map(Transaction::getAmount)
                .reduce(BigDecimal::add);
    }
}

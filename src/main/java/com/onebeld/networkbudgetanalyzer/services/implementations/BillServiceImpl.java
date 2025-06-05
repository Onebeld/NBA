package com.onebeld.networkbudgetanalyzer.services.implementations;

import com.onebeld.networkbudgetanalyzer.entities.Transaction;
import com.onebeld.networkbudgetanalyzer.repositories.TransactionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Stream;

@Service
public class BillServiceImpl {
    private final TransactionRepository transactionRepository;

    public BillServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Page<Transaction> getTransactions(Long billId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return transactionRepository.findByBillId(billId, pageable);
    }

    public Optional<Double> getBalance(Long billId) {
        Stream<Transaction> transactions = transactionRepository.findAllByBillId(billId);

        return transactions
                .map(Transaction::getAmount)
                .reduce(Double::sum);
    }
}

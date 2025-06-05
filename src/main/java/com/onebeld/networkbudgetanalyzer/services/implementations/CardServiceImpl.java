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
public class CardServiceImpl {
    private final TransactionRepository transactionRepository;

    public CardServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Page<Transaction> getTransactions(Long cardId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return transactionRepository.findByCardId(cardId, pageable);
    }

    public Optional<Double> getBalance(Long cardId) {
        Stream<Transaction> transactions = transactionRepository.findAllByCardId(cardId);

        return transactions
                .map(Transaction::getAmount)
                .reduce(Double::sum);
    }
}

package com.onebeld.networkbudgetanalyzer.repositories;

import com.onebeld.networkbudgetanalyzer.entities.Transaction;
import com.onebeld.networkbudgetanalyzer.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findByBillId(long billId, Pageable pageable);

    Stream<Transaction> findAllByBillId(long billId);

    Page<Transaction> findByCardId(long cardId, Pageable pageable);

    Stream<Transaction> findAllByCardId(long cardId);

    List<Transaction> findAllByUser(User user);
}

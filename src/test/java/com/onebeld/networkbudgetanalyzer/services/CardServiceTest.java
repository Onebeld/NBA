package com.onebeld.networkbudgetanalyzer.services;

import com.onebeld.networkbudgetanalyzer.entities.Transaction;
import com.onebeld.networkbudgetanalyzer.repositories.TransactionRepository;
import com.onebeld.networkbudgetanalyzer.services.implementations.CardServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CardServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private CardServiceImpl cardService;

    private Transaction transaction1;
    private Transaction transaction2;
    private final Long CARD_ID = 1L;
    private final int PAGE = 0;
    private final int SIZE = 10;

    @BeforeEach
    void setUp() {
        // Create test transactions
        transaction1 = new Transaction();
        transaction1.setId(1L);
        transaction1.setAmount(200.0);
        transaction1.setCreatedAt(Timestamp.from(Instant.now()));

        transaction2 = new Transaction();
        transaction2.setId(2L);
        transaction2.setAmount(-75.0);
        transaction2.setCreatedAt(Timestamp.from(Instant.now().plusSeconds(3600)));
    }

    @Test
    void getTransactions_ShouldReturnPageOfTransactions() {
        // Arrange
        Page<Transaction> expectedPage = new PageImpl<>(List.of(transaction1, transaction2));
        when(transactionRepository.findByCardId(anyLong(), any(Pageable.class)))
                .thenReturn(expectedPage);

        // Act
        Page<Transaction> result = cardService.getTransactions(CARD_ID, PAGE, SIZE);

        // Assert
        assertNotNull(result);
        assertEquals(2, result.getTotalElements());
        assertTrue(result.getContent().contains(transaction1));
        assertTrue(result.getContent().contains(transaction2));
    }

    @Test
    void getBalance_WithTransactions_ShouldReturnSum() {
        // Arrange
        when(transactionRepository.findAllByCardId(anyLong()))
                .thenReturn(Stream.of(transaction1, transaction2));

        // Act
        Optional<Double> result = cardService.getBalance(CARD_ID);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(125.0, result.get(), 0.001); // 200.0 + (-75.0) = 125.0
    }

    @Test
    void getBalance_WithNoTransactions_ShouldReturnEmpty() {
        // Arrange
        when(transactionRepository.findAllByCardId(anyLong()))
                .thenReturn(Stream.empty());

        // Act
        Optional<Double> result = cardService.getBalance(CARD_ID);

        // Assert
        assertTrue(result.isEmpty());
    }
}

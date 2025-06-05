package com.onebeld.networkbudgetanalyzer.controllers.api.v1;

import com.onebeld.networkbudgetanalyzer.dtos.AnalyticResponse;
import com.onebeld.networkbudgetanalyzer.dtos.GraphicResponse;
import com.onebeld.networkbudgetanalyzer.entities.Transaction;
import com.onebeld.networkbudgetanalyzer.entities.TransactionType;
import com.onebeld.networkbudgetanalyzer.entities.User;
import com.onebeld.networkbudgetanalyzer.enums.Operation;
import com.onebeld.networkbudgetanalyzer.repositories.TransactionRepository;
import com.onebeld.networkbudgetanalyzer.repositories.TransactionTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1", produces = "application/json")
public class AnalyticsController {
    private final TransactionRepository transactionRepository;
    private final TransactionTypeRepository transactionTypeRepository;

    @GetMapping("/analytics")
    public ResponseEntity<?> analytics() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<Transaction> transactions = transactionRepository.findAllByUser(user);
        List<TransactionType> transactionTypes = transactionTypeRepository.findAll();

        List<String> incomesLabels = new ArrayList<>();
        List<Double> incomesData = new ArrayList<>();

        List<String> expenseLabels = new ArrayList<>();
        List<Double> expenseData = new ArrayList<>();

        for (TransactionType transactionType : transactionTypes) {
            incomesLabels.add(transactionType.getName());
            expenseLabels.add(transactionType.getName());

            incomesData.add(transactions.stream()
                    .filter(t -> Objects.equals(t.getTransactionType().getId(), transactionType.getId()))
                    .filter(t -> t.getOperation() == Operation.INCOME)
                    .mapToDouble(Transaction::getAmount).sum());

            expenseData.add(transactions.stream()
                    .filter(t -> Objects.equals(t.getTransactionType().getId(), transactionType.getId()))
                    .filter(t -> t.getOperation() == Operation.EXPENSE)
                    .mapToDouble(Transaction::getAmount).sum());
        }

        GraphicResponse income = new GraphicResponse(incomesLabels, incomesData);
        GraphicResponse expense = new GraphicResponse(expenseLabels, expenseData);

        return ResponseEntity.ok(new AnalyticResponse(income, expense));
    }
}

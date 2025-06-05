package com.onebeld.networkbudgetanalyzer.controllers.api.v1;

import com.onebeld.networkbudgetanalyzer.dtos.OrganizationResponse;
import com.onebeld.networkbudgetanalyzer.dtos.TransactionRequest;
import com.onebeld.networkbudgetanalyzer.dtos.TransactionResponse;
import com.onebeld.networkbudgetanalyzer.entities.Transaction;
import com.onebeld.networkbudgetanalyzer.entities.User;
import com.onebeld.networkbudgetanalyzer.enums.Operation;
import com.onebeld.networkbudgetanalyzer.repositories.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1", produces = "application/json")
public class TransactionController {
    private final TransactionRepository transactionRepository;
    private final OrganizationRepository organizationRepository;
    private final TransactionTypeRepository transactionTypeRepository;

    private final CardRepository cardRepository;
    private final BillRepository billRepository;

    @GetMapping("/transactions")
    public ResponseEntity<?> getTransactions() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        List<TransactionResponse> billTransactionResponses = transactionRepository.findAllByUser(user).stream().map(transaction -> new TransactionResponse(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getCreatedAt(),
                user.getCurrency().getSymbol(),
                transaction.getTransactionType().getName(),
                new OrganizationResponse(transaction.getOrganization().getId(), transaction.getOrganization().getName(), transaction.getOrganization().getIcon_url()),
                transaction.getOperation().name()
        )).toList();

        return ResponseEntity.ok(billTransactionResponses);
    }

    @PostMapping("/transactions/add")
    public ResponseEntity<?> addTransaction(@Valid @RequestBody TransactionRequest transactionRequest) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Transaction transaction = Transaction.builder()
                .amount(transactionRequest.getAmount())
                .createdAt(transactionRequest.getCreatedAt())
                .organization(organizationRepository.getReferenceById(transactionRequest.getOrganizationId()))
                .operation(Operation.valueOf(transactionRequest.getOperation()))
                .transactionType(transactionTypeRepository.getReferenceById(transactionRequest.getTransactionTypeId()))
                .card(Objects.equals(transactionRequest.getBillType(), "CARD") ? cardRepository.getReferenceById(transactionRequest.getCardId()) : null)
                .bill(Objects.equals(transactionRequest.getBillType(), "BILL") ? billRepository.getReferenceById(transactionRequest.getBillId()) : null)
                .user(user)
                .build();

        transactionRepository.save(transaction);

        return ResponseEntity.ok("OK");
    }
}

package com.onebeld.networkbudgetanalyzer.controllers.api.v1;

import com.onebeld.networkbudgetanalyzer.dtos.OrganizationResponse;
import com.onebeld.networkbudgetanalyzer.entities.Bank;
import com.onebeld.networkbudgetanalyzer.entities.Currency;
import com.onebeld.networkbudgetanalyzer.entities.Organization;
import com.onebeld.networkbudgetanalyzer.entities.TransactionType;
import com.onebeld.networkbudgetanalyzer.repositories.BankRepository;
import com.onebeld.networkbudgetanalyzer.repositories.CurrencyRepository;
import com.onebeld.networkbudgetanalyzer.repositories.OrganizationRepository;
import com.onebeld.networkbudgetanalyzer.repositories.TransactionTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1", produces = "application/json")
public class SelectionController {
    private final CurrencyRepository currencyRepository;
    private final BankRepository bankRepository;
    private final OrganizationRepository organizationRepository;
    private final TransactionTypeRepository transactionTypeRepository;

    @GetMapping("/currency")
    public ResponseEntity<?> getCurrency() {
        List<Currency> currencies = currencyRepository.findAll();

        return ResponseEntity.ok(currencies);
    }

    @GetMapping("/bank")
    public ResponseEntity<?> getBank() {
        List<Bank> banks = bankRepository.findAll();

        return ResponseEntity.ok(banks);
    }

    @GetMapping("/organization")
    public ResponseEntity<?> getOrganization() {
        List<OrganizationResponse> organizations = organizationRepository.findAll().stream().map(organization ->
                new OrganizationResponse(organization.getId(), organization.getName(), organization.getIcon_url())).toList();

        return ResponseEntity.ok(organizations);
    }

    @GetMapping("/transaction-type")
    public ResponseEntity<?> getTransactionType() {
        List<TransactionType> transactionTypes = transactionTypeRepository.findAll();

        return ResponseEntity.ok(transactionTypes);
    }
}

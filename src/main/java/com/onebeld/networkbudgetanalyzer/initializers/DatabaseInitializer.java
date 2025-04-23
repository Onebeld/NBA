package com.onebeld.networkbudgetanalyzer.initializers;

import com.onebeld.networkbudgetanalyzer.entities.AccountType;
import com.onebeld.networkbudgetanalyzer.entities.Currency;
import com.onebeld.networkbudgetanalyzer.entities.Operation;
import com.onebeld.networkbudgetanalyzer.entities.Role;
import com.onebeld.networkbudgetanalyzer.repositories.AccountTypeRepository;
import com.onebeld.networkbudgetanalyzer.repositories.CurrencyRepository;
import com.onebeld.networkbudgetanalyzer.repositories.OperationRepository;
import com.onebeld.networkbudgetanalyzer.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;

    private final OperationRepository operationRepository;

    private final CurrencyRepository currencyRepository;

    private final AccountTypeRepository accountTypeRepository;

    public DatabaseInitializer(RoleRepository roleRepository, OperationRepository operationRepository, CurrencyRepository currencyRepository, AccountTypeRepository accountTypeRepository) {
        this.roleRepository = roleRepository;
        this.operationRepository = operationRepository;
        this.currencyRepository = currencyRepository;
        this.accountTypeRepository = accountTypeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
        initializeCurrencies();
        initializeAccountTypes();
    }

    private void initializeRoles() {
        if (roleRepository.count() != 0)
            return;

        Role userRole = new Role((short) 0, "USER");

        roleRepository.save(userRole);
    }

    private void initializeCurrencies() {
        if (currencyRepository.count() != 0)
            return;

        currencyRepository.save(new Currency((short) 0, "EUR"));
        currencyRepository.save(new Currency((short) 1, "USD"));
        currencyRepository.save(new Currency((short) 2, "RUB"));
        currencyRepository.save(new Currency((short) 3, "KZT"));
    }

    private void initializeAccountTypes() {
        if (accountTypeRepository.count() != 0)
            return;

        accountTypeRepository.save(new AccountType((short) 0, "PAYMENT_ACCOUNT"));
        accountTypeRepository.save(new AccountType((short) 1, "BANK_CARD"));
        accountTypeRepository.save(new AccountType((short) 2, "CASH"));
    }
}

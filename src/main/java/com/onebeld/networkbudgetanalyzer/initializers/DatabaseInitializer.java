package com.onebeld.networkbudgetanalyzer.initializers;

import com.onebeld.networkbudgetanalyzer.entities.AccountType;
import com.onebeld.networkbudgetanalyzer.entities.Currency;
import com.onebeld.networkbudgetanalyzer.entities.Role;
import com.onebeld.networkbudgetanalyzer.repositories.AccountTypeRepository;
import com.onebeld.networkbudgetanalyzer.repositories.CurrencyRepository;
import com.onebeld.networkbudgetanalyzer.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Инициализатор базы данных, выполняющий каждый раз, когда запускается сервер.
 * Благодаря проверке на наличие записей в таблице инициализатор ничего не добавляет.
 */
@Component
public class DatabaseInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;

    private final CurrencyRepository currencyRepository;

    private final AccountTypeRepository accountTypeRepository;

    public DatabaseInitializer(RoleRepository roleRepository, CurrencyRepository currencyRepository, AccountTypeRepository accountTypeRepository) {
        this.roleRepository = roleRepository;
        this.currencyRepository = currencyRepository;
        this.accountTypeRepository = accountTypeRepository;
    }

    /**
     * Запуск инициализации базы данных
     * @param args incoming main method arguments
     */
    @Override
    public void run(String... args) {
        initializeRoles();
        initializeAccountTypes();
        initializeCurrencies();
    }

    /**
     * Инициализация ролей
     */
    private void initializeRoles() {
        if (roleRepository.count() != 0)
            return;

        Role userRole = new Role("USER");

        roleRepository.save(userRole);
    }

    /**
     * Инициализация валют
     */
    private void initializeCurrencies() {
        if (currencyRepository.count() != 0)
            return;

        Currency eurCurrency = new Currency("EUR");
        Currency usdCurrency = new Currency("USD");
        Currency rubCurrency = new Currency("RUB");
        Currency kztCurrency = new Currency("KZT");

        currencyRepository.save(eurCurrency);
        currencyRepository.save(usdCurrency);
        currencyRepository.save(rubCurrency);
        currencyRepository.save(kztCurrency);
    }

    /**
     * Инициализация счетов
     */
    private void initializeAccountTypes() {
        if (accountTypeRepository.count() != 0)
            return;

        AccountType paymentAccountType = new AccountType("PAYMENT_ACCOUNT");
        AccountType bankCardAccountType = new AccountType("BANK_CARD");
        AccountType cashAccountType = new AccountType("CASH");

        accountTypeRepository.save(paymentAccountType);
        accountTypeRepository.save(bankCardAccountType);
        accountTypeRepository.save(cashAccountType);
    }
}

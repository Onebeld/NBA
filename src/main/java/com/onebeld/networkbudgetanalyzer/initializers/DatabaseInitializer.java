package com.onebeld.networkbudgetanalyzer.initializers;

import com.onebeld.networkbudgetanalyzer.entities.Bank;
import com.onebeld.networkbudgetanalyzer.entities.Currency;
import com.onebeld.networkbudgetanalyzer.entities.Organization;
import com.onebeld.networkbudgetanalyzer.entities.TransactionType;
import com.onebeld.networkbudgetanalyzer.repositories.BankRepository;
import com.onebeld.networkbudgetanalyzer.repositories.CurrencyRepository;
import com.onebeld.networkbudgetanalyzer.repositories.OrganizationRepository;
import com.onebeld.networkbudgetanalyzer.repositories.TransactionTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Инициализатор базы данных, выполняющий каждый раз, когда запускается сервер.
 * Благодаря проверке на наличие записей в таблице инициализатор ничего не добавляет.
 */
@Component
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {
    private final CurrencyRepository currencyRepository;
    private final BankRepository bankRepository;
    private final TransactionTypeRepository transactionTypeRepository;
    private final OrganizationRepository organizationRepository;

    /**
     * Запуск инициализации базы данных
     * @param args incoming main method arguments
     */
    @Override
    public void run(String... args) {
        initializeTransactionTypes();
        initializeOrganizations();
        initializeCurrencies();
        initializeBanks();
    }

    private void initializeTransactionTypes() {
        if (transactionTypeRepository.count() != 0)
            return;


        TransactionType goodsPayment = new TransactionType("GOODS_PAYMENT");
        TransactionType sbpTransfer = new TransactionType("SBP_TRANSFER");
        TransactionType betweenMyBills = new TransactionType("BETWEEN_MY_BILLS");
        TransactionType cashDeposit = new TransactionType("CASH_DEPOSIT");
        TransactionType capitalization = new TransactionType("CAPITALIZATION");
        TransactionType otherIncome = new TransactionType("OTHER_INCOME");

        transactionTypeRepository.save(goodsPayment);
        transactionTypeRepository.save(sbpTransfer);
        transactionTypeRepository.save(betweenMyBills);
        transactionTypeRepository.save(cashDeposit);
        transactionTypeRepository.save(capitalization);
        transactionTypeRepository.save(otherIncome);
    }

    private void initializeOrganizations() {
        if (organizationRepository.count() != 0)
            return;

        Organization[] organizations = new Organization[] {
                new Organization("Пятерочка", "https://buninave.ru/wp-content/uploads/2018/05/logo_5ka.png"),
                new Organization("Сбербанк", "https://static.rustore.ru/imgproxy/9dhjp-pQPvmfYpc90hiqWQE9mUBqhWqtgvHzNkpXFY0/preset:app_card_icon/aHR0cHM6Ly9zdGF0aWMucnVzdG9yZS5ydS9hcGsvNDYyMjcxL2NvbnRlbnQvSUNPTi9mMWIzYzY4YS1iNzM0LTQ4Y2UtYjYyZi00OTAyMDhkM2ZhMGUucG5n.webp"),
                new Organization("ВТБ RUS", "https://s3-symbol-logo.tradingview.com/vtbr--600.png"),
                new Organization("Красное&Белое", "https://play-lh.googleusercontent.com/NdCOyVFWZtsuf0Ww_dLmIT1v7RHk6H-HPZXC4v1MpsQKloa8_LzXxLoBeQv9WhBci0DL"),
                new Organization("Яндекс.Плюс", "https://promokodin.ru/wp-content/themes/promokodin/img/yandeks-plyus.png"),
                new Organization("Wildberries", "https://play-lh.googleusercontent.com/j1bpB1CYXc4RvWjXN8kcOZPArefU-sIM4L0FnmrgxlnaVJIFvaOIjYubcYaFg4n-Mg=w240-h480-rw"),
                new Organization("Т-Банк", "https://static.rustore.ru/imgproxy/9owqvBEyJs62P_am3oxb7w3xKswE4BnV-t7E0IC29As/preset:app_card_icon/aHR0cHM6Ly9zdGF0aWMucnVzdG9yZS5ydS9hcGsvMjIwODYzL2NvbnRlbnQvSUNPTi8yMjM4ZTNjYS1lM2U3LTQxZDAtYjAzNy03NzdkZGM2MzdhNWIucG5n.webp"),
                new Organization("Альфа-Банк", "https://static.rustore.ru/imgproxy/PDUXnzNJOjybXHJzuzHOLxFpu0m37zN25QTOU8qxKrw/preset:app_card_icon/aHR0cHM6Ly9zdGF0aWMucnVzdG9yZS5ydS9hZmIwN2YwMi01Mzk5LTRmNDUtYTM2Ni1lNDlhN2IzNDIwYWQ=.webp"),
        };

        organizationRepository.saveAll(Arrays.asList(organizations));
    }

    /**
     * Инициализация валют
     */
    private void initializeCurrencies() {
        if (currencyRepository.count() != 0)
            return;

        Currency eurCurrency = Currency.builder().name("EUR").symbol("€").build();
        Currency usdCurrency = Currency.builder().name("USD").symbol("$").build();
        Currency rubCurrency = Currency.builder().name("RUB").symbol("₽").build();
        Currency kztCurrency = Currency.builder().name("KZT").symbol("₸").build();

        currencyRepository.save(eurCurrency);
        currencyRepository.save(usdCurrency);
        currencyRepository.save(rubCurrency);
        currencyRepository.save(kztCurrency);
    }

    /**
     * Инициализация банков
     */
    private void initializeBanks() {
        if (bankRepository.count() != 0)
            return;

        Bank tinkoffBank = Bank.builder().name("Тинькофф").build();
        Bank sberBank = Bank.builder().name("Сбербанк").build();
        Bank alphabankBank = Bank.builder().name("Альфа-банк").build();
        Bank rosselhosBank = Bank.builder().name("Россельхозбанк").build();

        bankRepository.save(tinkoffBank);
        bankRepository.save(sberBank);
        bankRepository.save(alphabankBank);
        bankRepository.save(rosselhosBank);
    }
}

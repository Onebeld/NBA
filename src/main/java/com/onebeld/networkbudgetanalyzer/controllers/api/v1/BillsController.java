package com.onebeld.networkbudgetanalyzer.controllers.api.v1;

import com.onebeld.networkbudgetanalyzer.dtos.*;
import com.onebeld.networkbudgetanalyzer.entities.Bill;
import com.onebeld.networkbudgetanalyzer.entities.Card;
import com.onebeld.networkbudgetanalyzer.entities.Transaction;
import com.onebeld.networkbudgetanalyzer.entities.User;
import com.onebeld.networkbudgetanalyzer.enums.CardType;
import com.onebeld.networkbudgetanalyzer.enums.Operation;
import com.onebeld.networkbudgetanalyzer.repositories.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1", produces = "application/json")
public class BillsController {
    private final BillRepository billRepository;
    private final CardRepository cardRepository;
    private final BankRepository bankRepository;
    private final TransactionRepository transactionRepository;

    @GetMapping("/cards/info")
    public ResponseEntity<?> getCardsInfo() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        List<Bill> bills = billRepository.findAllByUser(user);
        List<Card> cards = cardRepository.findAllByUser(user);

        double billBalance = bills.stream()
                .flatMap(bill -> bill.getTransactions().stream())
                .mapToDouble(value -> {
                    if (value.getOperation() == Operation.INCOME) {
                        return value.getAmount();
                    } else {
                        return -value.getAmount();
                    }
                }).sum() + bills.stream().mapToDouble(Bill::getInitialBalance).sum();

        double cardBalance = cards.stream()
                .flatMap(card -> card.getTransactions().stream())
                .mapToDouble(value -> {
                    if (value.getOperation() == Operation.INCOME) {
                        return value.getAmount();
                    } else {
                        return -value.getAmount();
                    }
                })
                .sum() + cards.stream().mapToDouble(Card::getInitialBalance).sum();

        double balance = billBalance + cardBalance;

        double income = transactionRepository.findAllByUser(user).stream()
                .filter(value -> value.getOperation() == Operation.INCOME)
                .mapToDouble(Transaction::getAmount)
                .sum();

        double expense = transactionRepository.findAllByUser(user).stream()
                .filter(value -> value.getOperation() == Operation.EXPENSE)
                .mapToDouble(Transaction::getAmount)
                .sum();

        return ResponseEntity.ok(new CardsInfoResponse(balance, income, expense, user.getCurrency().getSymbol()));
    }

    @GetMapping("/bills")
    public ResponseEntity<?> getBills() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        // Get bills
        List<Bill> bills = billRepository.findAllByUser(user);
        List<Card> cards = cardRepository.findAllByUser(user);

        double billBalance = bills.stream()
                .flatMap(bill -> bill.getTransactions().stream())
                .mapToDouble(value -> {
                    if (value.getOperation() == Operation.INCOME) {
                        return value.getAmount();
                    } else {
                        return -value.getAmount();
                    }
                })
                .sum() + bills.stream().mapToDouble(Bill::getInitialBalance).sum();

        double cardBalance = cards.stream()
                .flatMap(card -> card.getTransactions().stream())
                .mapToDouble(value -> {
                    if (value.getOperation() == Operation.INCOME) {
                        return value.getAmount();
                    } else {
                        return -value.getAmount();
                    }
                })
                .sum() + cards.stream().mapToDouble(Card::getInitialBalance).sum();

        double balance = billBalance + cardBalance;

        List<BillItemResponse> billsResponse = bills.stream().map(bill -> new BillItemResponse(
                bill.getName(),
                bill.getNumber(),
                bill.getBank().getName(),
                bill.getTransactions().stream().mapToDouble(value -> {
                    if (value.getOperation() == Operation.INCOME) {
                        return value.getAmount();
                    } else {
                        return -value.getAmount();
                    }
                }).sum() + bill.getInitialBalance(),
                user.getCurrency(),
                bill.getRate()
        )).toList();

        List<CardItemResponse> cardsResponse = cards.stream().map(card -> new CardItemResponse(
                card.getCardType().name(),
                card.getNumber(),
                card.getBank().getName(),
                card.getTransactions().stream().mapToDouble(value -> {
                    if (value.getOperation() == Operation.INCOME) {
                        return value.getAmount();
                    } else {
                        return -value.getAmount();
                    }
                }).sum() + card.getInitialBalance(),
                user.getCurrency()
        )).toList();

        BillResponse billResponse = new BillResponse(
                balance,
                billBalance,
                cardBalance,
                user.getCurrency().getSymbol(),
                billsResponse,
                cardsResponse
        );

        return ResponseEntity.ok(billResponse);
    }

    @GetMapping("/bills/all")
    public ResponseEntity<?> getAllBills() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        SelectBillResponse[] bills = billRepository.findAllByUser(user).stream().map(bill -> new SelectBillResponse(
                bill.getId(),
                bill.getName(),
                bill.getNumber()
        )).toArray(SelectBillResponse[]::new);

        SelectCardResponse[] cards = cardRepository.findAllByUser(user).stream().map(card -> new SelectCardResponse(
                card.getId(),
                card.getBank().getName(),
                card.getNumber(),
                card.getCardType().name()
        )).toArray(SelectCardResponse[]::new);

        return ResponseEntity.ok(new SelectBillsResponse(bills, cards));
    }

    @PostMapping("/bills/add/bill")
    public ResponseEntity<?> addBill(@Valid @RequestBody BillItemRequest bill) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Bill newBill = Bill.builder()
                .name(bill.getName())
                .number(bill.getNumber())
                .initialBalance(bill.getInitialBalance())
                .rate(bill.getRate())
                .holder(bill.getHolder())
                .bank(bankRepository.getReferenceById(bill.getBank()))
                .user(user)
                .build();

        billRepository.save(newBill);

        return ResponseEntity.ok("OK");
    }

    @PostMapping("/bills/add/card")
    public ResponseEntity<?> addCard(@Valid @RequestBody CardItemRequest card) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Card newCard = Card.builder()
                .cardType(CardType.valueOf(card.getCardType()))
                .number(card.getNumber())
                .initialBalance(card.getInitialBalance())
                .holder(card.getHolder())
                .bank(bankRepository.getReferenceById(card.getBank()))
                .user(user)
                .expirationDate(card.getExpirationDate())
                .cvv(card.getCvv())
                .build();

        cardRepository.save(newCard);

        return ResponseEntity.ok("OK");
    }
}

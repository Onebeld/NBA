package com.onebeld.networkbudgetanalyzer.controllers.api.v1;

import com.onebeld.networkbudgetanalyzer.dtos.BillItemResponse;
import com.onebeld.networkbudgetanalyzer.dtos.BillResponse;
import com.onebeld.networkbudgetanalyzer.dtos.CardItemResponse;
import com.onebeld.networkbudgetanalyzer.entities.Bill;
import com.onebeld.networkbudgetanalyzer.entities.Card;
import com.onebeld.networkbudgetanalyzer.entities.Transaction;
import com.onebeld.networkbudgetanalyzer.entities.User;
import com.onebeld.networkbudgetanalyzer.repositories.BillRepository;
import com.onebeld.networkbudgetanalyzer.repositories.CardRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1", produces = "application/json")
public class BillsController {
    private final BillRepository billRepository;
    private final CardRepository cardRepository;

    public BillsController(BillRepository billRepository, CardRepository cardRepository) {
        this.billRepository = billRepository;
        this.cardRepository = cardRepository;
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
                .mapToDouble(Transaction::getAmount)
                .sum();

        double cardBalance = cards.stream()
                .flatMap(card -> card.getTransactions().stream())
                .mapToDouble(Transaction::getAmount)
                .sum();

        double balance = billBalance + cardBalance;

        List<BillItemResponse> billsResponse = bills.stream().map(bill -> new BillItemResponse(
                bill.getName(),
                bill.getNumber(),
                bill.getBank().getName(),
                bill.getTransactions().stream().mapToDouble(Transaction::getAmount).sum(),
                "EUR",
                bill.getRate()
        )).toList();

        List<CardItemResponse> cardsResponse = cards.stream().map(card -> new CardItemResponse(
                card.getCardType().name(),
                card.getNumber(),
                card.getBank().getName(),
                card.getTransactions().stream().mapToDouble(Transaction::getAmount).sum(),
                "EUR"
        )).toList();

        BillResponse billResponse = new BillResponse(
                balance,
                billBalance,
                cardBalance,
                billsResponse,
                cardsResponse
        );

        return ResponseEntity.ok(billResponse);
    }
}

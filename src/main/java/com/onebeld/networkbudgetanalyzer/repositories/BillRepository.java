package com.onebeld.networkbudgetanalyzer.repositories;

import com.onebeld.networkbudgetanalyzer.entities.Bank;
import com.onebeld.networkbudgetanalyzer.entities.Bill;
import com.onebeld.networkbudgetanalyzer.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findAllByUser(User user);
}

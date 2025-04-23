package com.onebeld.networkbudgetanalyzer.repositories;

import com.onebeld.networkbudgetanalyzer.entities.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationRepository extends JpaRepository<Operation, Short> {
}

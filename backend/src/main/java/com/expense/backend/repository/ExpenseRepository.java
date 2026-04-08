package com.expense.backend.repository;

import com.expense.backend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserIdOrderByExpenseDateDesc(Long userId);

    List<Expense> findByUserIdAndCategory(Long userId, String category);

    List<Expense> findByUserIdAndExpenseDateBetween(
            Long userId, LocalDate start, LocalDate end
    );

    List<Expense> findByUserIdAndIsAnomalyTrue(Long userId);

    @Query("""
        SELECT e.category, SUM(e.amount)
        FROM Expense e
        WHERE e.userId = :userId
        AND e.expenseDate >= :from
        GROUP BY e.category
        """)
    List<Object[]> sumByCategory(
            @Param("userId") Long userId,
            @Param("from") LocalDate from
    );
}

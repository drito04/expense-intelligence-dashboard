package com.expensedashboard.expense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.expensedashboard.expense.MonthlySummaryDTO;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("""
            SELECT new com.expensedashboard.expense.MonthlySummaryDTO(
                                               TO_CHAR(e.expenseDate, 'YYYY-MM'),
                                               e.category,
                                               SUM(e.amount)
                                           )
                                           FROM Expense e
                                           WHERE e.userId = :userId
                                           AND e.expenseDate >= :startDate
                                           GROUP BY TO_CHAR(e.expenseDate, 'YYYY-MM'), e.category
                                           ORDER BY TO_CHAR(e.expenseDate, 'YYYY-MM') DESC, e.category ASC
            """)
    List<MonthlySummaryDTO> findMonthlySummary(
            @Param("userId") Long userId, LocalDate startDate
    );

    List<Expense> findByUserIdAndIsAnomalyTrue(Long userId);
}

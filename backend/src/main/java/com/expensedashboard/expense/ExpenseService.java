package com.expensedashboard.expense;

import com.expensedashboard.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllExpensesByUserId(Long userId) {
        List<Expense> expenses = expenseRepository.findAll();
        if(expenses.isEmpty())
            throw new NullPointerException("No exceptions found in the database");
        return expenses;
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense with id: " + id + " not found"));
    }

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense updated) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense with id: " + id + " not found"));

        existing.setCategory(updated.getCategory());
        existing.setAmount(updated.getAmount());
        existing.setDescription(updated.getDescription());
        existing.setExpenseDate(updated.getExpenseDate());
        return expenseRepository.save(existing);
    }

    public boolean deleteExpense(Long id) {
        if(!expenseRepository.existsById(id))
            throw new ResourceNotFoundException("Expense with id: " + id + " not found");
        expenseRepository.deleteById(id);
        return true;
    }

    public List<MonthlySummaryDTO> getMonthlySummary(Long userId, int months) {
        LocalDate startDate = LocalDate.now().minusMonths(months);
        return expenseRepository.findMonthlySummary(userId, startDate);
    }

    public List<Expense> getAnomalyExpensesByUserId(Long userId) {
        return expenseRepository.findByUserIdAndIsAnomalyTrue(userId);
    }
}

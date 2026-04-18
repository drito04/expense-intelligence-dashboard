package com.expensedashboard.expense;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<List<Expense>> getExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpensesByUserId(1L));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpense(@PathVariable("id")Long id) {
        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.createExpense(expense));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable("id")Long id, @Valid @RequestBody Expense expense) {
        return ResponseEntity.ok(expenseService.updateExpense(id, expense));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteExpense(@PathVariable("id")Long id) {
        return ResponseEntity.ok(expenseService.deleteExpense(id));
    }

    @GetMapping("/{userId}/summary/{months}")
    public ResponseEntity<List<MonthlySummaryDTO>> getSummary(@PathVariable("userId") Long uid, @PathVariable("months") int months) {
        return ResponseEntity.ok(expenseService.getMonthlySummary(uid, months));
    }

    @GetMapping("/anomalies/{userId}")
    public ResponseEntity<List<Expense>> getAnomalies(@PathVariable("userId") Long uid) {
        return ResponseEntity.ok(expenseService.getAnomalyExpensesByUserId(uid));
    }
}

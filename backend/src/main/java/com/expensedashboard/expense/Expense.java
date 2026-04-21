package com.expensedashboard.expense;


import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
//    @NotNull
    private Long userId;

    @Column(name = "category", nullable = false, length = 50)
    @NotBlank
    private String category;

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    @NotNull
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;

    @Column(name = "description")
    private String description;

    @Column(name = "expense_date", nullable = false)
    @NotNull
    private LocalDate expenseDate;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_anomaly", columnDefinition = "boolean default false")
    private Boolean isAnomaly = false;
}

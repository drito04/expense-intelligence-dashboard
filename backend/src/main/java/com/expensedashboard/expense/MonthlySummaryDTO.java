package com.expensedashboard.expense;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class MonthlySummaryDTO {

    private String month;
    private String category;
    private BigDecimal total;
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExpense, deleteExpense } from '../api/expenseApi';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await getExpense();
      
      // Sort expenses from most recent to least recent
      const sortedExpenses = response.data.sort((a, b) => {
        return new Date(b.expenseDate) - new Date(a.expenseDate);
      });
      
      setExpenses(sortedExpenses);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
      setError('Could not load expenses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await deleteExpense(id);
      // Remove from local state — no need to re-fetch
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Failed to delete expense:', err);
      alert('Could not delete expense. Please try again.');
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading expenses…</p>;
  if (error)   return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2>All Expenses</h2>
        <button
          onClick={() => navigate('/expenses/new')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          + Add Expense
        </button>
      </div>

      {expenses.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>No expenses yet. Add one above!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Flag</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={tdStyle}>{expense.expenseDate}</td>
                <td style={tdStyle}>{expense.category}</td>
                <td style={tdStyle}>₹{parseFloat(expense.amount).toFixed(2)}</td>
                <td style={tdStyle}>{expense.description || '—'}</td>
                <td style={tdStyle}>
                  {expense.isAnomaly && (
                    <span style={{
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}>
                      ⚠ Anomaly
                    </span>
                  )}
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => navigate(`/expenses/${expense.id}/edit`)}
                    style={editBtnStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    style={deleteBtnStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = { padding: '10px 12px', color: '#374151', fontWeight: 600 };
const tdStyle = { padding: '10px 12px', color: '#374151' };
const editBtnStyle = {
  marginRight: '8px',
  padding: '4px 10px',
  backgroundColor: '#f59e0b',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '13px',
};
const deleteBtnStyle = {
  padding: '4px 10px',
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '13px',
};

export default ExpenseList;
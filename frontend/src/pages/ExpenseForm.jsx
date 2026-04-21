import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createExpense, getOneExpense, updateExpense } from '../api/expenseApi';

export const CATEGORIES = [
  'Food',
  'Transport',
  'Utilities',
  'Entertainment',
  'Health',
  'Other',
];

const initialFormState = {
  category: '',
  amount: '',
  description: '',
  expenseDate: new Date().toISOString().split('T')[0],
};

const ExpenseForm = () => {
  const { id } = useParams();         // present on /expenses/:id/edit, absent on /expenses/new
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(isEditMode); // true while pre-populating

  // Pre-populate form when editing
  useEffect(() => {
    if (!isEditMode) return;

    const fetchExpense = async () => {
      try {
        const response = await getOneExpense(id);
        const { category, amount, description, expenseDate } = response.data;
        setFormData({
          category,
          amount:      String(amount),
          description: description ?? '',
          expenseDate,
        });
      } catch (err) {
        console.error('Failed to load expense:', err);
        alert('Could not load expense. Returning to list.');
        navigate('/expenses');
      } finally {
        setFetching(false);
      }
    };

    fetchExpense();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    try {
      if (isEditMode) {
        await updateExpense(id, payload);
        alert('Expense updated successfully!');
      } else {
        await createExpense(payload);
        alert('Expense added successfully!');
        setFormData(initialFormState);
      }
      navigate('/expenses');
    } catch (err) {
      console.error('Error saving expense:', err);
      alert('Failed to save expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p style={{ textAlign: 'center' }}>Loading expense…</p>;

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>{isEditMode ? 'Edit Expense' : 'Add New Expense'}</h2>

      <form onSubmit={handleSubmit}>
        {/* Category */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            required
            min="0.01"
            step="0.01"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Description (Optional):</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What was this for?"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Date */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Date:</label>
          <input
            type="date"
            name="expenseDate"
            value={formData.expenseDate}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => navigate('/expenses')}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              borderRadius: '4px',
            }}
          >
            {loading ? 'Saving…' : isEditMode ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
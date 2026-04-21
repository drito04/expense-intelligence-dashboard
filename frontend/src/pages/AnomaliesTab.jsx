import { useState, useEffect } from 'react';
import { getAnomalies } from '../api/expenseApi';

const AnomaliesTab = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        // userId hardcoded as 1 until Phase 5 auth
        const response = await getAnomalies(1);
        setAnomalies(response.data);
      } catch (err) {
        console.error('Failed to fetch anomalies:', err);
        setError('Could not load anomalous transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnomalies();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading anomalies…</p>;
  if (error)   return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '0 16px' }}>
      <h2 style={{ marginBottom: '4px' }}>⚠ Anomalous Transactions</h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
        These expenses were flagged as unusual compared to your normal spending patterns.
      </p>

      {anomalies.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px',
          color: '#16a34a',
        }}>
          ✓ No anomalies detected. Your spending looks normal!
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            {anomalies.map((expense) => (
              <tr
                key={expense.id}
                style={{ borderBottom: '1px solid #fee2e2', backgroundColor: '#fff7f7' }}
              >
                <td style={tdStyle}>{expense.expenseDate}</td>
                <td style={tdStyle}>{expense.category}</td>
                <td style={{ ...tdStyle, color: '#dc2626', fontWeight: 600 }}>
                  ₹{parseFloat(expense.amount).toFixed(2)}
                </td>
                <td style={tdStyle}>{expense.description || '—'}</td>
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

export default AnomaliesTab;
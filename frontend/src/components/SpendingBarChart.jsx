import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getSummary } from '../api/expenseApi';

const CATEGORY_COLORS = {
  Food:          '#3b82f6',
  Transport:     '#10b981',
  Utilities:     '#f59e0b',
  Entertainment: '#8b5cf6',
  Health:        '#ef4444',
  Other:         '#6b7280',
};

// Transform the raw MonthlySummaryDTO list from Spring Boot into
// the shape Recharts expects: [{ month: 'Jan 2026', Food: 450, Transport: 120, ... }]
const transformData = (rawList) => {
  const map = {};

  rawList.forEach(({ month, category, total }) => {
    const label = new Date(`${month}-01`).toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });

    if (!map[label]) map[label] = { month: label, _sortKey: month }; // ← store raw "YYYY-MM" for sorting
    map[label][category] = parseFloat(total);
  });

  return Object.values(map)
    .sort((a, b) => a._sortKey.localeCompare(b._sortKey)) // ← sort ascending
    .map(({ _sortKey, ...rest }) => rest); // ← remove _sortKey before passing to Recharts
};

const SpendingBarChart = ({ userId = 1, months = 6 }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const response = await getSummary(userId, months);
        const raw = response.data;
        setChartData(transformData(raw));
      } catch (err) {
        console.error('Failed to load summary:', err);
        setError('Could not load spending data.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [userId, months]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading chart…</p>;
  if (error)   return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (chartData.length === 0)
    return <p style={{ textAlign: 'center' }}>No spending data yet.</p>;

  const categories = Object.keys(CATEGORY_COLORS);

  return (
    <div style={{ width: '100%', marginTop: '24px' }}>
      <h3 style={{ marginBottom: '12px' }}>Monthly Spending by Category</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 24, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `₹${v}`} />
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          <Legend />
          {categories.map((cat) => (
            <Bar
              key={cat}
              dataKey={cat}
              stackId="a"  
              fill={CATEGORY_COLORS[cat]}
              isAnimationActive={true}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingBarChart;
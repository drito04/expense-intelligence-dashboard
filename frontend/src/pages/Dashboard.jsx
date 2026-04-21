import { Link } from 'react-router-dom';
import SpendingBarChart from '../components/SpendingBarChart';

const Dashboard = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px' 
      }}>
        <h1 style={{ fontSize: '2rem', margin: 0, color: '#333' }}>Dashboard</h1>
        
        <Link 
          to="/expenses/new" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#12a378', 
            color: '#fff', 
            textDecoration: 'none', 
            borderRadius: '6px',
            fontWeight: 'bold',
            transition: 'background-color 0.2s'
          }}
        >
          + Add Expense
        </Link>
      </header>

      <main>
        {/* The chart component acts as an independent widget fetching its own data */}
        <SpendingBarChart userId={1} months={6} />
      </main>
    </div>
  );
};

export default Dashboard;

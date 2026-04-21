import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ExpenseList from './pages/ExpenseList.jsx';
import ExpenseForm from './pages/ExpenseForm';
import AnomaliesTab from './pages/AnomaliesTab';

function App() {

  return (
    <Router>
      <nav>
        <Link to = "/dashboard">Dashboard </Link>
        <Link to = "/expenses">Expenses </Link>
        <Link to = "/expenses/new">Expense Form</Link>
      </nav>

      <Routes>
        <Route path = "/" element = {<Navigate to = "/dashboard" replace/>} />

        <Route path = "/dashboard" element = {<Dashboard />} />
        <Route path = "/expenses" element = {<ExpenseList />} />
        <Route path = "/expenses/new" element = {<ExpenseForm />} />
        <Route path="/expenses/:id/edit" element={<ExpenseForm />} />  
        <Route path="/anomalies" element={<AnomaliesTab />} />
        <Route path = "*" element = {<Navigate to = "/dashboard"/>} />
      </Routes>
    </Router>
  )
}

export default App

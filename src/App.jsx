import {Link, BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import Budgets from './pages/Budgets.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
function App() {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  )
}
export default App;
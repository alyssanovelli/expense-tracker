import { NavLink } from "react-router-dom";
import "./sidebar.css";
function Sidebar() {
    return (
        <aside>
            <div className="logo">
                    Expense Tracker
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/transactions">Transactions</NavLink></li>
                    <li><NavLink to="/budgets">Budgets</NavLink></li>
                    <li><NavLink to="/reports">Reports</NavLink></li>
                    <li><NavLink to="/settings">Settings</NavLink></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;
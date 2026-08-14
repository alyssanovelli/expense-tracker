import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { useState } from "react";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
       <>
       <div className="mobile-header">
        <button
            className="menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
        >
            ☰
        </button>
                <div className="mobile-logo">
                    Expense Tracker
                </div>
        </div>
        
        {isOpen && (
            <div
                className="sidebar-overlay"
                onClick={closeMenu}
            ></div>
        )}
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header">
                <div className="logo">
                    Expense Tracker
                </div>

                <button
                    className="close-menu"
                    onClick={closeMenu}
                    aria-label="Close menu"
                >
                    &times;
                </button>
            </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink></li>
                        <li><NavLink to="/transactions" onClick={closeMenu}>Transactions</NavLink></li>
                        <li><NavLink to="/budgets" onClick={closeMenu}>Budgets</NavLink></li>
                        <li><NavLink to="/reports" onClick={closeMenu}>Reports</NavLink></li>
                    </ul>
                </nav>

                <nav className="account-nav">
                    <ul>
                        <li><NavLink to="/settings" onClick={closeMenu}>Settings</NavLink></li>
                        <li><button className="logout-btn" onClick={closeMenu}>
                            Logout
                        </button></li>
                    </ul>
                </nav>
            </aside></>
    )
}

export default Sidebar;
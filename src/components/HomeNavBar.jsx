import { NavLink, Link } from "react-router-dom";
import "./HomeNavBar.css";
import { House } from "lucide-react"

function HomeNavBar() {
  return (
    <nav className="home-nav-bar">
     <div className="logo">
          <Link to="/" className="home-icon">
            <House size={24} strokeWidth={2.5} />
          </Link>
          <span>Expense Tracker</span>
      </div>

        <ul>
        <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
        <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        </ul>
    </nav>
  );
}
export default HomeNavBar;
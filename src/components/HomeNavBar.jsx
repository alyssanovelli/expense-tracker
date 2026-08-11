import { NavLink } from "react-router-dom";
import "./HomeNavBar.css";

function HomeNavBar() {
  return (
    <nav className="home-nav-bar">
    <div className="logo">
        Expense Tracker
    </div>

        <ul>
        <li><NavLink to="/Register" activeClassName="active">Register</NavLink></li>
        <li><NavLink to="/Login" activeClassName="active">Login</NavLink></li>
        </ul>
    </nav>
  );
}
export default HomeNavBar;
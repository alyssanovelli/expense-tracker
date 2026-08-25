import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    
    return (
        <div className="home-page">
            <HomeNavBar />

            <main className="home-content">
                <h1>Welcome to Expense Tracker</h1>

                <p>
                    Track your expenses, manage your budget,
                    and understand where your money goes.
                </p>

                <button onClick={() => navigate("/login")}>
                    Try Demo
                </button>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
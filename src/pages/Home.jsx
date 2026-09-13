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

                <section className="hero-section">
                    <h1>Take control of your finances.</h1>

                    <p>
                        Track expenses, manage budgets, and get a clear
                        picture of where your money goes.
                    </p>

                    <div className="hero-buttons">
                        <button
                            onClick={() => navigate("/login?demo=true")}
                        >
                            Try Demo
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => navigate("/register")}
                        >
                            Create Account
                        </button>
                    </div>
                </section>

                <section className="features-section" id="features">
                    <h2>Everything you need to manage your money.</h2>

                    <div className="feature-grid">

                        <div className="feature-card">
                            <h3>Transactions</h3>
                            <p>
                                Track your income and expenses, add notes,
                                assign budgets, and manage your transaction
                                history.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Budgets</h3>
                            <p>
                                Create spending limits and see how your
                                actual spending compares to each budget.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Reports</h3>
                            <p>
                                Review your income, expenses, and spending
                                activity to better understand your finances.
                            </p>
                        </div>

                    </div>
                </section>

                <section className="how-it-works">
                    <h2>How it works</h2>

                    <div className="steps-grid">

                        <div className="step">
                            <span>1</span>
                            <h3>Create an account</h3>
                            <p>
                                Get started with a simple account.
                            </p>
                        </div>

                        <div className="step">
                            <span>2</span>
                            <h3>Track your transactions</h3>
                            <p>
                                Record your income and expenses.
                            </p>
                        </div>

                        <div className="step">
                            <span>3</span>
                            <h3>Set your budgets</h3>
                            <p>
                                Create spending limits for your needs.
                            </p>
                        </div>

                        <div className="step">
                            <span>4</span>
                            <h3>Understand your spending</h3>
                            <p>
                                Use reports to see where your money goes.
                            </p>
                        </div>

                    </div>
                </section>

                <section className="final-cta">
                    <h2>Ready to take control?</h2>

                    <p>
                        Explore Expense Tracker and see how simple
                        managing your finances can be.
                    </p>

                    <button
                        onClick={() => navigate("/login?demo=true")}
                    >
                        Try the Demo
                    </button>
                </section>

            </main>

            <Footer />
        </div>
    );
}

export default Home;
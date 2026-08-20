import HomeNavBar from "../components/HomeNavBar";
import Footer from "../components/Footer";
import "./Home.css";

function Home() {
    return (
        <div className="home-page">
            <HomeNavBar />

            <main className="home-content">
                <h1>Welcome to Expense Tracker</h1>

                <p>
                    Track your expenses, manage your budget,
                    and understand where your money goes.
                </p>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const location = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);
    useEffect(() => {
        setIsTransitioning(true);

        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 150);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <>
            <div className={`page-fade ${isTransitioning ? "fade-in" : ""}`} />
            <Outlet />
        </>
    );
}

export default App;
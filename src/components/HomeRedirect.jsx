import { Navigate } from "react-router-dom";

function HomeRedirect() {
    const token = localStorage.getItem("token");

    console.log("HomeRedirect token:", token);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/home" replace />;
}

export default HomeRedirect;
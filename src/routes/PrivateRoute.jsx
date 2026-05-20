import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // ডাটা লোড হওয়ার সময় একটি স্পিনার দেখাবে
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    // ইউজার লগইন থাকলে পেজটি দেখাবে
    if (user) {
        return children;
    }

    // লগইন না থাকলে লগইন পেজে পাঠিয়ে দিবে এবং আগের লোকেশন মনে রাখবে
    return <Navigate to="/login" state={location.pathname} replace></Navigate>;
};

export default PrivateRoute;




import { useContext } from "react";



import { AuthContext } from "../providers/AuthProvider";



import { Navigate, useLocation } from "react-router-dom";








const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);




    const location = useLocation();







    
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );



    }






    
    if (user) {
        return children;


    }

    
    return <Navigate to="/login" state={location.pathname} replace></Navigate>;




};







export default PrivateRoute;
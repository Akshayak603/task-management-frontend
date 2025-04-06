import { useContext } from "react"
import { AuthContext } from "../context/Authentication"
import { Navigate } from "react-router-dom";


const ProtectedRoute=({element})=>{
    const {isAuth, loading}= useContext(AuthContext);

    if (loading) return null;

    return isAuth? element : Navigate.to('/');
}

export default ProtectedRoute;
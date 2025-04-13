import { useContext } from "react"
import { AuthContext } from "../context/Authentication"
import { Navigate } from "react-router-dom";


const ProtectedRoute=({element})=>{
    const {isAuth, loading}= useContext(AuthContext);
    // console.log("isAuth1", isAuth)
    if (loading) return null;
    // console.log("isAuth2", isAuth)

    return isAuth? element :  <Navigate to="/"/>;
}

export default ProtectedRoute;
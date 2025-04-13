/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react';
import * as Yup from 'yup';
import { AuthContext } from '../context/Authentication';
import { Navigate } from 'react-router-dom';

export const customValidation= Yup.object().shape({
    title: Yup.string().required("Task title is required!"),
    description: Yup.string().required("Title description is required!")
});

export const PublicRoute= ({element})=>{
    const {isAuth, loading} = useContext(AuthContext);

    if(loading) return null
    return isAuth ? <Navigate to={"/tasks"} /> : element;
}

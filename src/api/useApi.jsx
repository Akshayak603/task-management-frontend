/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from 'axios';


const useApi= (BaseUrl)=>{
    const [error, setError]= useState(null);
    const [loading, setLoading]= useState(false);

    const getToken= ()=>{
        return localStorage.get('access_token');
    }

    const apiRequest=async (method, url, data=null)=>{
        setLoading(true);
        setError(null);

        try{
            const token= getToken();

            const response= await axios({
                method: method,
                url: `${BaseUrl}${url}`,
                data,
                headers: {
                    'Authorization': token ? `Bearer ${token}`: "",
                    'Content-Type': 'application/json',
                    }
            })

            return response.data;
        }
        catch (error){
            setError(error || "Something went Wrong");
            return null;
        }
        finally{
            setLoading(false);
        }
    };


    const get= (url)=> apiRequest("get", url, null);
    const post= (url, data)=> apiRequest("post", url, data);
    const patch= (url, data)=> apiRequest("patch", url, data);
    const del= (url)=> apiRequest("delete", url, null);

    return {get, post, patch, del, error, loading};
}

export default useApi;
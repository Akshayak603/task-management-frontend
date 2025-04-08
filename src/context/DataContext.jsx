/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider= ({children})=>{
    const [refreshPoint, setRefreshPoint] = useState(false);
    const [loading, setLoading]= useState(false);

    return <DataContext.Provider value={{refreshPoint, setRefreshPoint, loading, setLoading}}>
        {children}
    </DataContext.Provider>
}

export default DataProvider;
import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from '../shop-data.js';
// import { createCollection } from "../utils/firebase.utils.js";
import { getCollectionDocs } from "../utils/firebase.utils";
export const CategoriesContext = createContext({
    categories: {},
});

export const CategoriesProvider = ({children}) => {
    const [categories, setcategories] = useState({});
    const value = {categories, setcategories};
    // console.log(SHOP_DATA);
    
    
    useEffect(() => {
        const fetchData = async () => {
            const getCategories = await getCollectionDocs();
            console.log(getCategories);
            setcategories(getCategories)
        }

        fetchData();
    }, [])
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}
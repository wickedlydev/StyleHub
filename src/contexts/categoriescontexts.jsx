import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data.js";
import { getCollectionDocs } from "../utils/firebase.utils.js";

const staticCategories = SHOP_DATA.reduce((acc, category) => {
    acc[category.title.toLowerCase()] = category.items;
    return acc;
}, {});
export const CategoriesContext = createContext({
    categories: {},
});

export const CategoriesProvider = ({children}) => {
    const [categories, setcategories] = useState({});
    const value = {categories, setcategories};
    // console.log(SHOP_DATA);
    
    
    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const getCategories = await getCollectionDocs();
                if (!mounted) {
                    return;
                }
                if (getCategories && Object.keys(getCategories).length) {
                    setcategories(getCategories);
                } else {
                    setcategories(staticCategories);
                }
            } catch (error) {
                console.error("Failed to fetch categories, falling back to static data", error);
                if (mounted) {
                    setcategories(staticCategories);
                }
            }
        }

        fetchData();
        return () => {
            mounted = false;
        };
    }, [])
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}
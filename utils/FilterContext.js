// File used to facilitate the filtering of menu items by category and searching for menu items

import React, {createContext, useContext, useState, useEffect} from "react";
import { filterByQuery, getMenuItems, filterByCategory, filterByCategoryAndQuery } from "./database";

const FilterContext = createContext();

export function useFilter(){
    return useContext(FilterContext);
}

export function FilterProvider({children, setMenuData}){
    const [activeCategories, setActiveCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    const filterMenuData = async () => {
        if(activeCategories.length == 0 && searchQuery == ''){
            const newData = await getMenuItems();
            setMenuData(newData);
            return;
        }
        else if(activeCategories.length == 0 && searchQuery != ''){
            const newData = await filterByQuery(searchQuery);
            setMenuData(newData);
            return;
        }
        else if(activeCategories.length != 0 && searchQuery == ''){
            const newData = await filterByCategory(activeCategories);
            setMenuData(newData);
            return;
        }
        else{
            const newData = await filterByCategoryAndQuery(activeCategories, searchQuery);
            setMenuData(newData);
            return;
        }
    }
    useEffect(() => {
        filterMenuData();
    }, [activeCategories, searchQuery])
    return(
        <FilterContext.Provider value={{activeCategories, setActiveCategories, searchQuery, setSearchQuery}}>
            {children}
        </FilterContext.Provider>
    );
}
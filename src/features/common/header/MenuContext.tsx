'use client';
import {createContext, ReactNode, useContext, useState} from "react";

interface MenuContext{
    isMenuOpen: boolean;
    toggleMenu: () => void;
}
const context = createContext<MenuContext>(null!);

interface  MenuProps
{
    children: ReactNode;
}

export const useMenu = () => useContext(context);

export function Menu({children}: MenuProps)
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <context.Provider value={{isMenuOpen, toggleMenu}}>
            {children}
        </context.Provider>
    );
}

import { createContext } from "react";

type MenuContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const MenuContext = createContext<MenuContextType>({
    isOpen: false,
    setIsOpen: () => { }
});


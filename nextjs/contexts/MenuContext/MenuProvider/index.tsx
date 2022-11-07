import { ReactNode, useEffect, useState } from "react";
import { MenuContext } from "..";

type MenuProviderProps = {
    children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderProps) => {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        if (isOpen) {
            document.body.classList.add('open-menu');
        } else {
            document.body.classList.remove('open-menu');
        }

    }, [isOpen]);

    return <MenuContext.Provider value={{ isOpen, setIsOpen }}>{children}</MenuContext.Provider>

}
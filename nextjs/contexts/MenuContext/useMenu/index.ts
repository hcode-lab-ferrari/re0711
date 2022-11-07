import { useContext } from "react";
import { MenuContext } from "..";

export function useMenu() {

    const context = useContext(MenuContext);

    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }

    return context;

}
import { useContext } from "react";
import { AuthContext } from "..";

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthContext");
    }

    return context;

}

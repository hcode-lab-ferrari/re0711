import { ReactNode, useState } from "react";
import { AuthContext } from "..";
import { FormType } from "../../../types/FormType";

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [currentForm, setCurrentForm] = useState<FormType>("login");

    return <AuthContext.Provider value={{ currentForm, setCurrentForm }}>
        {children}
    </AuthContext.Provider>

};
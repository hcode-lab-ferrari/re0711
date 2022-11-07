import { createContext } from "react";
import { FormType } from "../../types/FormType";

type AuthContextType = {
    currentForm: FormType,
    setCurrentForm: (form: FormType) => void
}

export const AuthContext = createContext<AuthContextType>({
    currentForm: 'email',
    setCurrentForm: () => { }
});
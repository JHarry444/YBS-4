import { createContext } from "react";

export type AuthContextType = {
    isAuthenticated: boolean;
    name: string;
    role: "USER" | "ADMIN";
    login: (name: string, role: "USER" | "ADMIN") => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
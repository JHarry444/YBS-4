import { useState } from "react";
import AuthContext from "./auth";



function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<{ isAuthenticated: boolean; name: string; role: "USER" | "ADMIN" }>({
        isAuthenticated: false,
        name: "",
        role: "USER",
    });

    function login(name: string, role: "USER" | "ADMIN") {
        setAuth({
            isAuthenticated: true,
            name,
            role,
        });
    }

    function logout() {
        setAuth({
            isAuthenticated: false,
            name: "",
            role: "USER",
        });
    }

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
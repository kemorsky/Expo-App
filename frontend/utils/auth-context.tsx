import { createContext, useContext } from "react";
import type { AuthPayload } from "@/__generated__/graphql";

type AuthContext = {
    isLoggedIn: boolean,
    logIn: (email: string, password: string) => Promise<void>,
    logOut: () => Promise<void>,
    rehydrate: () => Promise<void>,
    user: AuthPayload | null,
}

const AuthState = createContext<AuthContext | null>(null);

export const useAuth = () => {
    const context = useContext(AuthState);
    if (context === null) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context
}

export default AuthState
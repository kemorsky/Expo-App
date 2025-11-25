import { useRouter } from "expo-router";
import { saveToken, getRefreshToken, saveRefreshToken, deleteToken, deleteRefreshToken} from './token'
import { PropsWithChildren, useState } from "react";
import { useLogin, useRefreshToken } from "@/lib/api/user/userMutations";
import type { AuthPayload } from "@/__generated__/graphql";
import AuthState from './AuthContext'

type AuthProviderProps = PropsWithChildren

export function AuthProvider({ children }: AuthProviderProps) {
    const [ user, setUser ] = useState<AuthPayload | null>(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ isRehydrated, setIsRehydrated ] = useState(false);
    const { login }  = useLogin();
    const { refreshToken } = useRefreshToken();
    const router = useRouter();

    async function logIn(email: string, password: string) {
        try {
            const data = await login(email, password);
            if (!data) return console.log("Login failed: no data returned");

            const accessToken = data?.token;
            const refreshToken = data?.refreshToken;

            await saveToken(accessToken ?? '');
            await saveRefreshToken(refreshToken ?? '');
            setUser({
                id: data.id,
                email: data.email,
                name: data.name,
                token: data.token,
                refreshToken: data.refreshToken
            })
            setIsLoggedIn(true)
            router.replace("/home");
        } catch (error) {
            throw new Error (`Login failed: ${error}`);
        }
    };

    async function logOut() {
        await deleteToken();
        await deleteRefreshToken();
        setUser(null)
        setIsLoggedIn(false)
        router.replace("/Login");
    };

    async function rehydrate() {
        try {
            const storedRefreshToken = await getRefreshToken();
            if (!storedRefreshToken) return;

            const data = await refreshToken(storedRefreshToken);
            if (!data) return console.log("Login failed: no data returned");

            await saveToken(data.token ?? '');
            await saveRefreshToken(data.refreshToken ?? '');
            setUser({
                id: data.id,
                email: data.email,
                name: data.name,
                token: data.token,
                refreshToken: data.refreshToken
            });
            setIsLoggedIn(true);
            
        } catch (error) {
            throw new Error (`Error rehydrating user: ${error}`);
        } finally {
            setIsRehydrated(true);
        }
    }

    if (!isRehydrated) {
        rehydrate();
        return null;
    }

    return <AuthState.Provider value={{ isLoggedIn, logIn, logOut, user, rehydrate }}>
                {children}
            </AuthState.Provider>
    
}
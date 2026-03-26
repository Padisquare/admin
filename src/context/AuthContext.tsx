"use client";
import { showToast } from "@/lib/toast";
import Cookies from "js-cookie";
import { createContext, useCallback, useContext, useState } from "react";

type ProviderValueType = {
    token: string | null;
    storeToken?: (token: string) => void;
    resetToken?: () => void;
};
const AuthContext = createContext<ProviderValueType>({
    token: null,
});
const { Provider } = AuthContext;

type AuthProviderProps = {
    children: React.ReactNode;
};
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(() => {
        const storedToken = Cookies.get("token");
        return storedToken ? storedToken : null;
    });
    const storeToken = useCallback((token: string,) => {
        Cookies.set("token", token);
        setToken(token);
    }, []);
    const resetToken = useCallback(() => {
        Cookies.remove("token");
        setToken(null);
        showToast("success", "Logged out successfully");
    }, []);

    return (
        <Provider
            value={{
                token,
                storeToken,
                resetToken,
            }}
        >
            {children}
        </Provider>
    );
};
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
export { AuthContext, AuthProvider };

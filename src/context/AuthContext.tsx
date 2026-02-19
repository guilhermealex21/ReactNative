import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, singOut, User } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

interface AuthContextData {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userLogged) => {
            setUser(userLogged);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    async function login(email: string, password: string) {
       await signInWithEmailAndPassword(auth, email, password);
    }
    
    async function logout() {
        await singOut(auth);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
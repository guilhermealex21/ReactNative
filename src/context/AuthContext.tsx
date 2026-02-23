import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
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
        console.log('🔐 AuthProvider iniciado - Configurando listener de autenticação');
        const unsubscribe = onAuthStateChanged(auth, (userLogged) => {
            console.log('🔐 Mudança de autenticação detectada:', userLogged?.email || 'sem usuário');
            setUser(userLogged);
            setLoading(false);
        });

        return () => {
            console.log('🔐 AuthProvider desmontado');
            unsubscribe();
        };
    }, []);

    async function login(email: string, password: string) {
       await signInWithEmailAndPassword(auth, email, password);
    }
    
    async function logout() {
        await signOut(auth);
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
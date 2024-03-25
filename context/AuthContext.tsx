import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { auth } from "@/services/firebase";
import firebase from "firebase/compat/app";

const AuthContext = createContext<any>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

    function signup(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    },[]);

    const value = {
        currentUser,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
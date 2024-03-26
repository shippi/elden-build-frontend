import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { auth } from "@/services/firebase";
import firebase from "firebase/compat/app";
import { SignUpModal } from "@/components";
import { User, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext<any>(undefined)

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [signUpOpened, setSignUpOpened] = useState(false);
    
    function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    },[]);

    const value = {
        currentUser,
        setCurrentUser,
        signUpOpened,
        setSignUpOpened
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    )
}

export default AuthContext;
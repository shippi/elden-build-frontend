import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";

const AuthContext = createContext<any>(undefined)

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [signUpOpened, setSignUpOpened] = useState(false);
    const [signUpSuccessOpened, setSignUpSuccessOpened] = useState(true);
    
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
        setSignUpOpened,
        signUpSuccessOpened,
        setSignUpSuccessOpened
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    )
}

export default AuthContext;
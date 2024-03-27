import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { auth } from "@/services/firebase";
import { User, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext<any>(undefined)

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [signUpOpened, setSignUpOpened] = useState(false);
    
    function signup(email: string, password: string) {
        try {
            let uid;

            const user = createUserWithEmailAndPassword(auth, email, password)
            .then(data => uid = data.user.uid);

            return user;
        }
        catch (error) {
            return error;
        }
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
        setSignUpOpened,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    )
}

export default AuthContext;
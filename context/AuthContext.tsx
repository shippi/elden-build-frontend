import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import { getUsername } from "@/services/authService";

export const AuthContext = createContext<any>(undefined)

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [signUpOpened, setSignUpOpened] = useState(false);
    const [signUpSuccessOpened, setSignUpSuccessOpened] = useState(false);
    const [loginOpened, setLoginOpened] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const data = window.localStorage.getItem("username");
        if (data) setUsername(data);
    }, []);
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                setCurrentUser(user);
            }
            else {
                setCurrentUser(null);
                setUsername("");
                window.localStorage.removeItem("username");
            }

        });
        return unsubscribe;
    },[username]);


    const value = {
        currentUser,
        setCurrentUser,
        signUpOpened,
        setSignUpOpened,
        signUpSuccessOpened,
        setSignUpSuccessOpened,
        loginOpened,
        setLoginOpened,
        username,
        setUsername
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    )
}

import { PropsWithChildren, createContext, useEffect, useState } from "react"
import { auth } from "@/services/firebase";
import { User, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext<any>(undefined)

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [signUpOpened, setSignUpOpened] = useState(false);
    
    async function signup(email: string, username: string, password: string) {
        try {
            let uid;

            const user = await createUserWithEmailAndPassword(auth, email, password)
            .then(data => uid = data.user.uid);

            console.log(uid)
            await fetch(process.env.NEXT_PUBLIC_API_URL + "users", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: uid,
                    email: email,
                    username: username
                })
            }).then(res => res.json()).then(data => console.log(data));
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
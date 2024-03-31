import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { deleteCookie, setCookie } from "cookies-next";

export async function signup(email: string, username: string, password: string) {
    let uid;

    await createUserWithEmailAndPassword(auth, email, password)
            .then(data => uid = data.user.uid);

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
    });

    auth.signOut();
    
    deleteCookie('username');
}

export async function getUsername(id: string) {
    let username = "";
    await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length > 0) username = data[0].username; 
                });

    if (username) setCookie("username", username);
    return username;
}
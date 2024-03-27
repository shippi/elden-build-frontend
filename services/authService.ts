import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export async function signup(email: string, username: string, password: string) {
    try {
        let uid;

        const user = await createUserWithEmailAndPassword(auth, email, password)
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
        }).then(res => res.json()).then(data => console.log(data));
        return user;
    }
    catch (error) {
        return error;
    }
}
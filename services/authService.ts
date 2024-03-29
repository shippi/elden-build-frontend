import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export async function signup(email: string, username: string, password: string) {
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
    });

    auth.signOut();
}

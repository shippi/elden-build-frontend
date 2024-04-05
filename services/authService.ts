/**
 * Function that sends a POST request to the back-end to sign up a user.
 * @param email 
 * @param username 
 * @param password 
 */
export async function signup(email: string, username: string, password: string) {
    await fetch(process.env.NEXT_PUBLIC_API_URL + "users", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    });
}

/**
 * Used to retrieve a user's username based on their uid by
 * sending a GET request to the back-end.
 * @param id 
 * @returns 
 */
export async function getUsername(id: string) {
    let username = "";
    await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length > 0) username = data[0].username; 
                });
    return username;
}
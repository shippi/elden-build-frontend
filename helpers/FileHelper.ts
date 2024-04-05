/**
 * Checks if a build name exists for a given user by sending a GET request for builds,
 * using uid and build name. If a row is returned then there exists a build for a user with
 * the build name.
 * @param uid 
 * @param name 
 * @returns 
 */
export async function checkNameExists(uid: string, name: string) {
    let res = await fetch(process.env.NEXT_PUBLIC_API_URL + `builds?uid=${uid}&name=${name}`);
    let data = await res.json();
    if (data.length < 1) return false;
  
    return true;
}
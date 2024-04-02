export async function checkNameExists(uid: string, name: string) {
    let res = await fetch(process.env.NEXT_PUBLIC_API_URL + `builds?uid=${uid}&name=${name}`);
    let data = await res.json();
    if (data.length < 1) return false;
  
    return true;
}
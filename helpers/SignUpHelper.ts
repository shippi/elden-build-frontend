import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'

export function validateEmail(email: string) {
  if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return false;
  else return true;
}

export async function checkEmailExists(email: string) {
  let res = await fetch(process.env.NEXT_PUBLIC_API_URL + `users?email=${email.toLowerCase()}`);
  let data = await res.json();

  if (data.length < 1) return true;

  return false;
}

export async function checkUsernameExists(username: string | undefined) {
  let res = await fetch(process.env.NEXT_PUBLIC_API_URL + `users?username=${username?.toLowerCase()}`);
  let data = await res.json();

  if (data.length < 1) return true;

  return false;
}

export function validatePassword(password: string) {
    const options = {
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
      },
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      translations: zxcvbnEnPackage.translations
    }

    zxcvbnOptions.setOptions(options);
      
    return zxcvbn(password);
}

export function validateUsername(username: string) {
    if (username && !/^[\w_]{4,30}$/.test(username)) return false;
    else return true;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
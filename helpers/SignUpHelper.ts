import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'

/**
 * Checks validity of email by using regex
 * @param email 
 * @returns 
 */
export function validateEmail(email: string) {
  if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return false;
  else return true;
}

/**
 * Checks if an email exists by attempting to send a GET request to find a user
 * with the given email address.
 * @param email 
 * @returns 
 */
export async function checkEmailExists(email: string) {
  let res = await fetch(process.env.NEXT_PUBLIC_API_URL + `users?email=${email}`);
  let data = await res.json();
  if (data.length < 1) return false;

  return true;
}

/**
 * Checks if a username exists by attempting to send a GET request to find a user
 * with the given email username.
 * @param username 
 * @returns 
 */
export async function checkUsernameExists(username: string | undefined) {
  let res = await fetch(process.env.NEXT_PUBLIC_API_URL + `users?username=${username}`);
  let data = await res.json();

  if (data.length < 1) return false;

  return true;
}

/**
 * Returns the strength of a password (int value from 0-4) using the zxcvbn library.
 * @param password 
 * @returns 
 */
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

/**
 * Validates username based on regex
 * @param username 
 * @returns 
 */
export function validateUsername(username: string) {
    if (username && !/^[\w_]{4,30}$/.test(username)) return false;
    else return true;
}


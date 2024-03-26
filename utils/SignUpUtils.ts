import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'

export function validateEmail(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
    else return false;
}

export function validatePassword(password: string) {
    const options = {
        dictionary: {
          ...zxcvbnCommonPackage.dictionary,
          ...zxcvbnEnPackage.dictionary,
        },
        graphs: zxcvbnCommonPackage.adjacencyGraphs,
        translations: zxcvbnEnPackage.translations,
      }
    zxcvbnOptions.setOptions(options)
      
    return zxcvbn(password);
}

export function validateUsername(username: string) {
    if (username.length < 3) return false;
    else return true;
}
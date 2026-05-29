import { lowercase, uppercase, numbers, symbols } from "../constants/characters"

export const generatePassword = (lengthPassword: number, useUppercase: boolean, useNumbers: boolean, useSymbols: boolean): string => {
    if (!window.crypto?.getRandomValues) {
        throw new Error('Crypto API not available')
    }

    if (lengthPassword < 4 || lengthPassword > 32) {
        throw new Error('Length must be between 4 and 32')
    }

    let characters = lowercase

    if (useUppercase)
        characters += uppercase
    if (useNumbers)
        characters += numbers
    if (useSymbols)
        characters += symbols

    const randomNumbers = new Uint32Array(lengthPassword)
    crypto.getRandomValues(randomNumbers)

    let result = ""

    for (const random of randomNumbers) {
        const index = random % characters.length
        result += characters[index]
    }

    return result
}

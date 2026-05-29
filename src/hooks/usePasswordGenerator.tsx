import { useState, useCallback, useEffect } from "react"
import { generatePassword as generatePasswordUtil } from "../utils/generatePassword"
import { calculatePasswordStrength } from "../utils/calculatePasswordStrength"
import type { StrengthResult } from "../utils/calculatePasswordStrength"
import toast from "react-hot-toast"
import { CONFIG } from "../constants/config"

interface UsePasswordGeneratorReturn {
    password: string
    lengthPassword: number
    useUppercase: boolean
    useNumbers: boolean
    useSymbols: boolean
    setLengthPassword: (length: number) => void
    setUseUppercase: (use: boolean) => void
    setUseNumbers: (use: boolean) => void
    setUseSymbols: (use: boolean) => void
    generatePassword: () => void
    strength: StrengthResult
    passwordHistory: string[]
}

export const usePasswordGenerator = (): UsePasswordGeneratorReturn => {

    const [password, setPassword] = useState<string>('')

    const [lengthPassword, setLengthPassword] = useState<number>(() => {
        const saved = localStorage.getItem('passwordLength')
        try {
            return saved ? JSON.parse(saved) : 8
        } catch (error) {
            return 8
        }
    })

    const [useUppercase, setUseUppercase] = useState<boolean>(() => {
        const saved = localStorage.getItem('passwordUseUppercase')
        return saved ? JSON.parse(saved) : false
    })

    const [useNumbers, setUseNumbers] = useState<boolean>(() => {
        const saved = localStorage.getItem('passwordUseNumbers')
        return saved ? JSON.parse(saved) : false
    })

    const [useSymbols, setUseSymbols] = useState<boolean>(() => {
        const saved = localStorage.getItem('passwordUseSymbols')
        return saved ? JSON.parse(saved) : false
    })

    const [passwordHistory, setPasswordHistory] = useState<string[]>(() => {
        const saved = localStorage.getItem('passwordHistory')
        return saved ? JSON.parse(saved) : []
    })

    const [strength, setStrength] = useState<StrengthResult>({ score: 0, level: 'Password required' })

    useEffect(() => {
        localStorage.setItem('passwordLength', JSON.stringify(lengthPassword))
    }, [lengthPassword])

    useEffect(() => {
        localStorage.setItem('passwordUseUppercase', JSON.stringify(useUppercase))
    }, [useUppercase])

    useEffect(() => {
        localStorage.setItem('passwordUseNumbers', JSON.stringify(useNumbers))
    }, [useNumbers])

    useEffect(() => {
        localStorage.setItem('passwordUseSymbols', JSON.stringify(useSymbols))
    }, [useSymbols])

    useEffect(() => {
        localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory))
    }, [passwordHistory])

    const generatePassword = useCallback(() => {
        try {
            const result = generatePasswordUtil(lengthPassword, useUppercase, useNumbers, useSymbols)
            setPassword(result)

            const strengthResult = calculatePasswordStrength({
                password: result,
            })
            setStrength(strengthResult)

            setPasswordHistory(prev => [result, ...prev].slice(0, CONFIG.PASSWORD_HISTORY_LIMIT))

        } catch (error) {
            toast.error('Error generating password')
        }

    }, [lengthPassword, useUppercase, useNumbers, useSymbols])

    return {
        password,
        lengthPassword,
        useUppercase,
        useNumbers,
        useSymbols,
        setLengthPassword,
        setUseUppercase,
        setUseNumbers,
        setUseSymbols,
        generatePassword,
        strength,
        passwordHistory,
    }
}
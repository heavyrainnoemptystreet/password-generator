interface CalculatePasswordStrengthProps {
    password: string
}

export interface StrengthResult {
    score: number
    level: 'Weak' | 'Medium' | 'Strong' | 'Password required'
}

export const calculatePasswordStrength = ({ password }: CalculatePasswordStrengthProps) => {
    let score = 0
    let level: 'Weak' | 'Medium' | 'Strong' | 'Password required' = 'Password required'

    if (password.length < 8)
        score += 1
    if (password.length >= 8 && password.length <= 12)
        score += 2
    if (password.length > 12)
        score += 3

    if (/[A-Z]/.test(password))
        score += 1
    if (/[0-9]/.test(password))
        score += 1
    if (/[!@#$%^&*()]/.test(password))
        score += 1

    if (score >= 0 && score <= 2)
        level = 'Weak'
    if (score >= 3 && score <= 4)
        level = 'Medium'
    if (score >= 5)
        level = 'Strong'
    if (password.length === 0)
        level = 'Password required'

    return { score, level }

}

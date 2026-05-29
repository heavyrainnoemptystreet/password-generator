import toast from "react-hot-toast"

interface PasswordHistoryProps {
    passwordHistory: string[]
}

const PasswordHistory = ({ passwordHistory }: PasswordHistoryProps) => {
    const handleCopy = (password: string) => {
        navigator.clipboard.writeText(password)
        toast.success('Password copied')
    }
    return (
        <div>
            <ul className="space-y-2 right-0 text-white">
                {passwordHistory.length === 0 ? <li className="text-neutral-500 text-sm whitespace-nowrap">No passwords yet</li> : passwordHistory.map((password, index) => (
                    <li className="text-white font-mono text-sm cursor-pointer rounded p-0.5" key={index} onClick={() => handleCopy(password)}>{password}</li>
                ))}
            </ul>
        </div>
    )
}

export default PasswordHistory
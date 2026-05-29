import { useState } from "react"
import toast from "react-hot-toast"
import { CONFIG } from "../constants/config"

interface PasswordDisplayProps {
    password: string
}

const PasswordDisplay = ({ password }: PasswordDisplayProps) => {
    const [copied, setCopied] = useState(false)


    return (
        <div className="card flex items-center justify-between gap-3">
            <span className="text-secondary font-mono text-sm truncate">
                {password || "Click generate"}
            </span>
            <button
                className="text-muted hover:text-white transition-colors text-sm font-mono"
                onClick={() => { navigator.clipboard.writeText(password); setCopied(true); toast.success('Copied to clipboard'); setTimeout(() => setCopied(false), CONFIG.COPY_FEEDBACK_DURATION) }}
                disabled={!password}
            >
                {copied ? "Copied" : "Copy"}
            </button>
        </div>
    )
}

export default PasswordDisplay
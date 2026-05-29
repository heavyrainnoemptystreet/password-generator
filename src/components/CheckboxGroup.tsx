interface CheckboxGroupProps {
    useUppercase: boolean
    useNumbers: boolean
    useSymbols: boolean
    setUseUppercase: (value: boolean) => void
    setUseNumbers: (value: boolean) => void
    setUseSymbols: (value: boolean) => void
}

const CheckboxGroup = ({ useUppercase, setUseUppercase, useNumbers, setUseNumbers, useSymbols, setUseSymbols }: CheckboxGroupProps) => {
    return (
        <div className="flex flex-col gap-3">
            <label className="label-group">
                <input
                    type="checkbox"
                    checked={useUppercase}
                    onChange={() => setUseUppercase(!useUppercase)}
                    className="w-4 h-4 accent-white"
                />
                <span className="text-muted transition-colors font-mono">Uppercase</span>
            </label>
            <label className="label-group">
                <input
                    type="checkbox"
                    checked={useNumbers}
                    onChange={() => setUseNumbers(!useNumbers)}
                    className="w-4 h-4 accent-white"
                />
                <span className="text-muted transition-colors font-mono">Numbers</span>
            </label>
            <label className="label-group">
                <input
                    type="checkbox"
                    checked={useSymbols}
                    onChange={() => setUseSymbols(!useSymbols)}
                    className="w-4 h-4 accent-white"
                />
                <span className="text-muted transition-colors font-mono">Symbols</span>
            </label>
        </div>
    )
}

export default CheckboxGroup
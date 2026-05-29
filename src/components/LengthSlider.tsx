interface LengthSliderProps {
    lengthPassword: number
    setLengthPassword: (value: number) => void
}

const LengthSlider = ({ setLengthPassword, lengthPassword }: LengthSliderProps) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted font-mono">Length</span>
                <span className="text-secondary font-mono">{lengthPassword}</span>
            </div>
            <input
                type='range'
                min={4}
                max={32}
                value={lengthPassword}
                onChange={(e) => setLengthPassword(Number(e.target.value))}
                className="w-full accent-white"
            />
        </div>
    )
}

export default LengthSlider
import type { StrengthResult } from '../utils/calculatePasswordStrength'

const StrengthMeter = ({ strength }: { strength: StrengthResult }) => {
    const getColor = () => {
        switch (strength.level) {
            case 'Weak':
                return 'bg-red-500'
            case 'Medium':
                return 'bg-yellow-500'
            case 'Strong':
                return 'bg-green-500'
            default:
                return 'bg-gray-500'
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
                <span className="text-muted">Strength</span>
                <span className={`font-mono capitalize text-white ${getColor().replace('bg-', 'text-')}`}>
                    {strength.level}
                </span>
            </div>
            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${getColor()}`}
                    style={{ width: `${(strength.score / 6) * 100}%` }}
                />
            </div>
        </div>
    )
}

export default StrengthMeter

import { usePasswordGenerator } from "../hooks/usePasswordGenerator"
import PasswordDisplay from "./PasswordDisplay"
import LengthSlider from "./LengthSlider"
import CheckboxGroup from "./CheckboxGroup"
import StrengthMeter from "./StrengthMeter"
import Header from "./Header"

const PasswordGenerator = () => {
    const { generatePassword, password, lengthPassword, setLengthPassword, useUppercase, setUseUppercase, useNumbers, setUseNumbers, useSymbols, setUseSymbols, strength, passwordHistory } = usePasswordGenerator()
    return (
        <div className="min-h-screen flex flex-col bg-neutral-950 p-4">
            <Header passwordHistory={passwordHistory} />
            <div className="flex-1 flex items-center justify-center">
                <section className="container">
                    <h1 className="text-2xl font-light text-center text-neutral-100 tracking-wide font-mono">Password Generator</h1>
                    <button className="btn py-3 px-4" onClick={generatePassword}>Generate</button>
                    <PasswordDisplay password={password} />
                    <StrengthMeter strength={strength} />
                    <LengthSlider setLengthPassword={setLengthPassword} lengthPassword={lengthPassword} />
                    <CheckboxGroup useUppercase={useUppercase} setUseUppercase={setUseUppercase} useNumbers={useNumbers} setUseNumbers={setUseNumbers} useSymbols={useSymbols} setUseSymbols={setUseSymbols} />
                    <p className="text-center text-red-900 font-mono">by heavyrainnoemptystreet</p>
                </section>
            </div>
        </div>
    )

}

export default PasswordGenerator
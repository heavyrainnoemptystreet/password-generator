import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import toast from "react-hot-toast"
import Header from "../components/Header"
import { Link } from "react-router-dom"


const Dashboard = () => {
    const [passwords, setPasswords] = useState<string[]>([])
    const { user } = useAuth()

    useEffect(() => {
        const saved = localStorage.getItem('passwordHistory')
        setPasswords(saved ? JSON.parse(saved) : [])
    }, [])

    const deletePasswords = async (index: number) => {
        setPasswords(prev => {
            const newPasswords = prev.filter((_, i) => i !== index)
            localStorage.setItem('passwordHistory', JSON.stringify(newPasswords))
            return newPasswords
        })
    }

    const copyPassword = async (password: string) => {
        try {
            await navigator.clipboard.writeText(password)
            toast.success('Password copied')
        } catch (error) {
            toast.error('Failed to copy')
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-neutral-950 p-4">
            <Header passwordHistory={passwords} />

            <div className="flex-1 flex items-center justify-center">
                <section className="container">
                    <h1 className="text-2xl font-light text-neutral-100 tracking-wide font-mono">Dashboard</h1>
                    <Link to='/' className="text-neutral-100 font-mono font-light">Back to Generator</Link>


                    <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 mb-8">
                        <h2 className="text-neutral-100 label-group mb-4">Profile</h2>
                        <p className="text-neutral-100 font-mono">Email: {user?.email}</p>
                    </div>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                        {passwords.map((password, index) => (
                            <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 flex items-center justify-between">
                                <span className="text-neutral-100 font-mono">{password}</span>
                                <div className="flex gap-2">
                                    <button className='btn py-2 px-3 text-sm' onClick={() => copyPassword(password)}>Copy</button>
                                    <button className='btn py-2 px-3 text-sm' onClick={() => deletePasswords(index)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

        </div>
    )
}

export default Dashboard
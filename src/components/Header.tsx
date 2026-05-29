import { useEffect, useRef, useState } from "react"
import PasswordHistory from "./PasswordHistory"
import { AnimatePresence, motion } from "framer-motion"
import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

interface HeaderProps {
    passwordHistory: string[]
}

const Header = ({ passwordHistory }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
                <img src="/logo.webp" alt="logo" className="w-20 h-20 mr-3" />
                <h1 className="text-2xl font-light text-neutral-100 tracking-wide font-mono">Password Generator</h1>
            </div>

            <div className="flex gap-2 items-center">
                {user ? (
                    <>
                        <Link to='/dashboard' className="btn py-2 px-3 text-sm font-mono">Dashboard</Link>
                        <button className="btn py-2 px-3 text-sm font-mono" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to='/login' className="btn py-2 px-3 text-sm font-mono">Login</Link>
                        <Link to='/register' className="btn py-2 px-3 text-sm font-mono">Register</Link>

                    </>
                )}



                <div className="relative" ref={dropdownRef}>
                    <button
                        className="btn py-2 px-3 text-sm font-mono"
                        onClick={() => setIsOpen(!isOpen)}
                    > Password History
                    </button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full right-0 z-10 bg-neutral-950 border border-neutral-700 rounded-lg shadow-lg p-4 min-w-auto mt-2"
                            >
                                <PasswordHistory passwordHistory={passwordHistory} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div >
            </div>
        </div >
    )
}

export default Header

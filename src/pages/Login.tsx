import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email')
            setLoading(false)
            return
        }

        try {
            await login(email, password)
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-neutral-950 p-4'>
            <section className='container'>
                <h1 className='text-2xl font-light text-center text-neutral-100 tracking-wide font-mono mb-8'>Login</h1>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label className='label-group text-white'>Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-3 bg-neutral-900 border border-neutral-700 rounded text-neutral-100 font-mono'
                            required
                        />
                    </div>

                    <div>
                        <label className='label-group text-white'>Password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-3 bg-neutral-900 border border-neutral-700 rounded text-neutral-100 font-mono'
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='btn py-3 px-4 w-full'
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className='text-center text-neutral-500 mt-6'>
                    Don't have an account? <Link to="/register" className='text-neutral-100 hover:text-neutral-300'>Register</Link>
                </p>

            </section>
        </div>
    )
}

export default Login
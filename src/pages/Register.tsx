import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const Register = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const { register } = useAuth()
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

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            setLoading(false)
            return
        }

        try {
            await register(email, password)
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
                <h1 className='text-2xl font-light text-center text-neutral-100 tracking-wide font-mono mb-8'>Register</h1>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label className='label-group'>Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email'
                            className='w-full p-3 bg-neutral-900 border border-neutral-700 rounded text-neutral-100 font-mono'
                            required
                        />
                    </div>

                    <div>
                        <label className='label-group'>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            className='w-full p-3 bg-neutral-900 border border-neutral-700 rounded text-neutral-100 font-mono'
                            required
                        />
                    </div>

                    <div>
                        <label className='label-group'>Confirm Password</label>
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            type='password'
                            className='w-full p-3 bg-neutral-900 border border-neutral-700 rounded text-neutral-100 font-mono'
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='btn py-3 px-4 w-full'
                        disabled={loading}
                    >
                        {loading ? 'Create Account...' : 'Create Account'}
                    </button>
                </form>

                <p className='text-center text-neutral-500 mt-6'>
                    Already have an account? <Link to="/login" className='text-neutral-100 hover:text-neutral-300'>Login</Link>
                </p>
            </section>
        </div>
    )
}

export default Register
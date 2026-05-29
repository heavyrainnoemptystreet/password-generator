import { createContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'


interface User {
    id: string
    email: string
    [key: string]: any
}

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | any>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            setLoading(false)
        }

        checkSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (!error)
                toast.success('Login successful')
            else
                toast.error(error.message)
        } catch (error) {
            toast.error('Network error')
        }
    }

    const register = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signUp({ email, password })

            if (error) {
                toast.error(error.message)
                return
            }

            toast.success('Registeration successful! Please check your email.')

        } catch (error) {
            toast.error('Network error')
        }
    }

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                toast.error(error.message)
            }

            toast.success('Signout')
        } catch (error) {
            toast.error('Network error')
        }
    }


    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const {user, loading} = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-950">
                <div className="text-neutral-100">Loading...</div>
            </div>
        )
    }

    if(!user) {
        return <Navigate to='/login'/>
    }

    return (
        <>{children}</>        
    )
}

export default ProtectedRoute
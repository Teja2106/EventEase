import axios from "axios";
import { useEffect, useState } from "react"

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/check', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if(response.data.authenticated) {
                    setIsAuthenticated(true);
                    setUserId(response.data.user_id);
                } else {
                    setIsAuthenticated(false);
                }
            } catch(err) {
                setIsAuthenticated(false);
                console.error('Error checking authentication: ', err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    })
    return (
        { isAuthenticated, userId, loading }
    )
}
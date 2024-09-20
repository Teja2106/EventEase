import axios from "axios";
import { useEffect, useState } from "react";

type User = {
    user_id: string,
    full_name: string,
    username: string,
    email: string,
    college_name: string
}

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<User>({} as User);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/check', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if(response.data.authenticated) {
                    setIsAuthenticated(true);
                    setUserId(response.data);
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
    });
    return (
        { isAuthenticated, userId, loading }
    );
}
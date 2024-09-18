import useAuth from "../hooks/useAuth";
import Loader from "./ui/Loader";

export default function Dashboard() {
    const { isAuthenticated, userId, loading } = useAuth();

    if (loading) {
        return <div className="h-screen flex justify-center items-center">{<Loader />}</div>
    }

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex justify-center items-center">
                <p className="text-red-500 xl:text-7xl">You are not logged in.</p>
            </div>
        )
    }

    return (
        <>
            <h1>Welcome user { userId }</h1>
        </>
    )
}

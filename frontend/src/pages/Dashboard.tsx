import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {

    const { user, logout } = useAuth();
    return (
        <div>
            <h1>Dashboard</h1>
            <nav className="bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-semibold">
                                My App
                            </span>
                        </div>

                        {user && (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">
                                    Welcome, {user.email}
                                </span>
                                <button
                                    onClick={logout}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
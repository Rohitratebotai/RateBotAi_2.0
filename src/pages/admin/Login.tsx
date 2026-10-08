import { useState } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    console.log(error, "error in login.tsx");
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/login", { username, password });
            localStorage.setItem("token", res.data.token);
            navigate("/admin/dashboard");
        } catch {
            setError("Invalid Credentials!");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg w-96 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-3 rounded bg-gray-700 text-white pr-10"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            // Eye closed SVG
                            // <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10-1.657 0-3.234-.336-4.675-.938M3 3l18 18" />
                            // </svg>
                            <FaEye />
                        ) : (
                            // Eye open SVG
                            // <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
                            // </svg>
                            <FaEyeSlash />
                        )}
                    </button>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded text-white font-semibold">
                    Login
                </button>
            </form>
        </div>
    );
}

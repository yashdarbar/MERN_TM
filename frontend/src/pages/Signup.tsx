"use client";

import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
//import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
//import axios from "axios";
import api from "@/config/axios";

export default function Signup() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    //const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    //const [showPassword, setShowPassword] = useState(false);
    //const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //const togglePasswordVisibility = () => setShowPassword(!showPassword);
    // const toggleConfirmPasswordVisibility = () =>
    //     setShowConfirmPassword(!showConfirmPassword);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!formData.username || !formData.email || !formData.password) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            setLoading(false);
            return;
        }

        try {
            const { data } = await api.post("/api/auth/register", formData);

            // Show success message
            const successMessage =
                "Account created successfully! Redirecting to login...";

            // Optional: Store the success message in sessionStorage to show it on the login page
            sessionStorage.setItem("registrationSuccess", successMessage);

            // Add a small delay for better UX
            setTimeout(() => {
                // Navigate to login page
                navigate("/login");
            }, 1500);
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                    "An error occurred during signup"
            );
            console.error("Signup failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div className="min-h-screen flex items-center justify-center p-4">
        //     <Card className="w-full max-w-md">
        //         <CardHeader>
        //             <CardTitle className="text-2xl font-bold text-center">
        //                 Create an account
        //             </CardTitle>
        //         </CardHeader>
        //         <CardContent>
        //             <form>
        //                 <div className="space-y-4">
        //                     <div className="space-y-2">
        //                         <Label htmlFor="name">Full Name</Label>
        //                         <Input
        //                             id="name"
        //                             placeholder="Enter your full name"
        //                             required
        //                         />
        //                     </div>
        //                     <div className="space-y-2">
        //                         <Label htmlFor="email">Email</Label>
        //                         <Input
        //                             id="email"
        //                             type="email"
        //                             placeholder="Enter your email"
        //                             required
        //                         />
        //                     </div>
        //                     <div className="space-y-2">
        //                         <Label htmlFor="password">Password</Label>
        //                         <div className="relative">
        //                             <Input
        //                                 id="password"
        //                                 type={
        //                                     showPassword ? "text" : "password"
        //                                 }
        //                                 placeholder="Create a password"
        //                                 required
        //                             />
        //                             <Button
        //                                 type="button"
        //                                 variant="ghost"
        //                                 size="icon"
        //                                 className="absolute right-2 top-1/2 -translate-y-1/2"
        //                                 onClick={togglePasswordVisibility}
        //                             >
        //                                 {showPassword ? (
        //                                     <EyeOffIcon className="h-4 w-4 text-gray-500" />
        //                                 ) : (
        //                                     <EyeIcon className="h-4 w-4 text-gray-500" />
        //                                 )}
        //                             </Button>
        //                         </div>
        //                     </div>
        //                     {/* <div className="space-y-2">
        //                         <Label htmlFor="confirm-password">
        //                             Confirm Password
        //                         </Label>
        //                         <div className="relative">
        //                             <Input
        //                                 id="confirm-password"
        //                                 type={
        //                                     showConfirmPassword
        //                                         ? "text"
        //                                         : "password"
        //                                 }
        //                                 placeholder="Confirm your password"
        //                                 required
        //                             />
        //                             <Button
        //                                 type="button"
        //                                 variant="ghost"
        //                                 size="icon"
        //                                 className="absolute right-2 top-1/2 -translate-y-1/2"
        //                                 onClick={
        //                                     toggleConfirmPasswordVisibility
        //                                 }
        //                             >
        //                                 {showConfirmPassword ? (
        //                                     <EyeOffIcon className="h-4 w-4 text-gray-500" />
        //                                 ) : (
        //                                     <EyeIcon className="h-4 w-4 text-gray-500" />
        //                                 )}
        //                             </Button>
        //                         </div>
        //                     </div> */}
        //                 </div>
        //                 <Button
        //                     className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
        //                     type="submit"
        //                 >
        //                     Sign up
        //                 </Button>
        //             </form>
        //         </CardContent>
        //         <CardFooter className="flex justify-center">
        //             <p className="text-sm text-gray-600">
        //                 Already have an account?{" "}
        //                 <Link
        //                     to="/login"
        //                     className="text-blue-600 hover:underline"
        //                 >
        //                     Log in
        //                 </Link>
        //             </p>
        //         </CardFooter>
        //     </Card>
        // </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Create Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* {success && (
                            <Alert className="bg-green-50 text-green-700 border-green-200">
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )} */}

                        <div className="space-y-2">
                            <Input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full"
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                        <div className="text-center text-sm text-gray-500">
                            Have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-blue-500 hover:text-blue-600"
                            >
                                Login up here
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

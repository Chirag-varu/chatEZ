import { useEffect, useState, FormEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [verified, setVerified] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [timeLeft, setTimeLeft] = useState(300);
    const { verify_otp2, isVerify_OTP } = useAuthStore();
    const { updatePassword, sendOTP } = useAuthStore();
    const navigate = useNavigate();

    const handleEmailVerify = async (e: FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return toast.error("Email is required")
        setIsSubmitting(true);
        try {
            const response = await sendOTP({ email });

            if (!response) {
                toast.error("Failed to send OTP");
                setIsSubmitting(false);
                return;
            } else {
                toast.success("OTP sent successfully");
                setIsModalOpen(true);
            }
        } catch {
            toast.error("Failed to send OTP");
        }
    }

    const handleOtpSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const trimmedOtp = otp.trim();
            const isVerified = await verify_otp2({ email, otp: trimmedOtp });
            console.log("Is Verify OTP: " + isVerify_OTP);

            if (!isVerified) {
                setOtpError("Invalid OTP or OTP has expired");
                setIsSubmitting(false);
                return; // Stop further execution if OTP is incorrect
            }

            setVerified(true);
            setIsModalOpen(false);
        } catch (error: any) {
            setOtpError("Invalid OTP or OTP has expired");
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleUpdatePassword = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await updatePassword({ email, password });
            if (result) {
                navigate("/Log-In");
            } else {
                toast.error("password is not updated.");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            toast("Failed to update password. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        if (isModalOpen && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setIsModalOpen(false);
            setIsSubmitting(false);
        }
    }, [isModalOpen, timeLeft]);

    return (
        <div className="min-h-screen grid dark:bg-gray-900">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">

                {verified ?
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">Update Password</h1>
                            <p className="text-base-content/60 dark:text-gray-400">
                                Enter your new password.
                            </p>
                        </div>

                        <form onSubmit={handleUpdatePassword} className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-900 dark:text-gray-300">Email: {email}</span>
                                </label>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium text-gray-900 dark:text-gray-300">Update Password</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="size-5 text-base-content/40 dark:text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="input input-bordered w-full pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                            placeholder="••••••••"
                                            value={password}
                                            autoComplete="current-password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="size-5 text-base-content/40 dark:text-gray-400" />
                                            ) : (
                                                <Eye className="size-5 text-base-content/40 dark:text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-bold w-full dark:text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="flex justify-center items-center">
                                            <span className="loading loading-dots loading-lg"></span>
                                        </div>
                                        Updating password...
                                    </>
                                ) : (
                                    "Change password"
                                )}
                            </button>
                        </form>
                    </div>
                    : <div className="w-full max-w-md space-y-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">Update Password</h1>
                            <p className="text-base-content/60 dark:text-gray-400">
                                Enter your email to reset your password.
                            </p>
                        </div>

                        <form onSubmit={handleEmailVerify} className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-900 dark:text-gray-300">Email</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="size-5 text-base-content/40 dark:text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        className="input input-bordered w-full pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                        placeholder="johnDoe@gmail.com"
                                        value={email}
                                        autoComplete="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-bold w-full dark:text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="flex justify-center items-center">
                                            <span className="loading loading-dots loading-lg"></span>
                                        </div>
                                        Sending OTP...
                                    </>
                                ) : (
                                    "Verify Email"
                                )}
                            </button>
                        </form>
                    </div>
                }

            </div>

            {/* OTP Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Enter OTP</h3>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {otpError && (
                            <p className="text-red-500 text-center text-sm pb-4">
                                {otpError}
                            </p>
                        )}
                        <p className="text-gray-500 text-center mb-4">
                            Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                        </p>
                        <div className="flex justify-between">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                onClick={() => {
                                    setIsModalOpen(false)
                                    setIsSubmitting(false)
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 font-semibold bg-indigo-500 text-white rounded-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={handleOtpSubmit}
                                aria-label="Verify OTP"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdatePassword;

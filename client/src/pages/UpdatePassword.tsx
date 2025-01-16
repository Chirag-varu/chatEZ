import { useState, FormEvent } from "react";

const UpdatePassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate an async operation (e.g., API call)
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Password reset link has been sent to your email.");
        }, 2000);
    };

    return (
        <div className="min-h-screen grid dark:bg-gray-900">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">Update Password</h1>
                        <p className="text-base-content/60 dark:text-gray-400">
                            Enter your email to receive a password reset link.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-900 dark:text-gray-300">Email</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    className="input input-bordered w-full pl-3 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                    placeholder="johnDoe@example.com"
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
                                    Sending...
                                </>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;

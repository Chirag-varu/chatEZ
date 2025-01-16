import { useEffect, useState, FormEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/favicon_T.png";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const { signup, isSigningUp } = useAuthStore();
  const { verify_otp, isVerify_OTP } = useAuthStore();

  const validateForm = (): boolean => {
    if (!formData.name.trim()) return toast.error("Full name is required"), false;
    if (!formData.email.trim()) return toast.error("Email is required"), false;
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format"), false;
    if (!formData.password) return toast.error("Password is required"), false;
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters"), false;

    return true;
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const success = validateForm();

    if (success) {
      signup(formData);
      setIsModalOpen(true);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const trimmedOtp = otp.trim();

      const isVerified = await verify_otp({ email: formData.email, otp: trimmedOtp });
      setTimeout(() => { }, 3000);
      console.log("Value of verify: ", isVerified, " status: ", isVerify_OTP);

      // if (isVerified == null ? false : true) {
      //   window.location.href = "/chat";
      // } else {
      //   setOtpError("Invalid OTP or OTP has expired");
      // }
    } catch (error: any) {
      setOtpError("Invalid OTP or OTP has expired");
    }
  };

  useEffect(() => {
    if (isModalOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsModalOpen(false);
    }
  }, [isModalOpen, timeLeft]);


  return (
    <div className="min-h-screen grid dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 mt-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors dark:bg-gray-800 dark:group-hover:bg-gray-700"
              >
                <img src={logo} alt="chatEZ" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">Create Account</h1>
              <p className="text-base-content/60 dark:text-gray-400">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-900 dark:text-gray-300">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  placeholder="John Doe"
                  value={formData.name}
                  autoComplete="name"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

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
                  placeholder="johnDoe@example.com"
                  value={formData.email}
                  autoComplete="email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-900 dark:text-gray-300">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 dark:text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  placeholder="••••••••"
                  value={formData.password}
                  autoComplete="current-password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            <button type="submit" className="btn btn-primary font-bold w-full dark:text-white" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <div className="flex justify-center items-center h-screen">
                    <span className="loading loading-dots loading-lg"></span>
                  </div>
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/Log-In" className="link link-primary dark:text-blue-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Enter OTP</h3>
            <p className="text-gray-500 text-center mb-4">
              Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </p>
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
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
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

export default SignUpPage;

import { useState, FormEvent, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/favicon_T.png";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { adminLogin, isLoggingIn } = useAuthStore();
  const { checkAuthAdmin } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await adminLogin(formData);

    if (response) {
      navigate("/admin");
    }
  };

  useEffect(() => {
    const response = checkAuthAdmin();
    console.log('====================================');
    console.log('response:', response);
    console.log('====================================');
  }, []);

  return (
    <div className="min-h-screen grid dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors dark:bg-gray-800 dark:group-hover:bg-gray-700 pointer-events-none">
                <img src={logo} alt="Admin Dashboard" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">Admin Login</h1>
              <p className="text-base-content/60 dark:text-gray-400">Sign in to your dashboard</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="admin@gmail.com"
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
                  placeholder="admin444"
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

            <button type="submit" className="btn btn-primary font-bold w-full dark:text-white" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <div className="flex justify-center items-center h-screen">
                    <span className="loading loading-dots loading-lg"></span>
                  </div>
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60 dark:text-gray-400">
              Not an admin? <Link to="/Log-In" className="link link-primary dark:text-blue-400">User Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

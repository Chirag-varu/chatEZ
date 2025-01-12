import { Link } from "react-router-dom";
import { Frown } from "lucide-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center dark:bg-slate-600">
      <Frown className="w-16 h-16 text-gray-800 dark:text-gray-200 mb-4" />
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">404 - Page Not Found</h1>
      <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;

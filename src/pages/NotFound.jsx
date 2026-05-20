import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-black text-blue-600 opacity-20">404</h1>
      <h2 className="text-4xl font-bold text-gray-900 -mt-10 mb-4">Oops! Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">The page you are looking for doesn't exist or has been moved. Let's get you back to safety.</p>
      <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
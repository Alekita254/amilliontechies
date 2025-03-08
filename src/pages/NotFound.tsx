import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded">Go Home</Link>
    </div>
  );
};

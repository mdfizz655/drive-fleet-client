import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // --- Password Validation (Assignment Requirement) ---
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Must have an Uppercase letter in the password.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Must have a Lowercase letter in the password.");
      return;
    }

    // ১. ইউজার তৈরি করা
    createUser(email, password)
      .then((result) => {
        // ২. ইউজারের প্রোফাইল (নাম ও ছবি) আপডেট করা
        updateUserProfile(name, photo)
          .then(() => {
            toast.success("Registration Successful! Please login.");
            // অ্যাসাইনমেন্টের নিয়ম অনুযায়ী রেজিস্ট্রেশনের পর লগইন পেজে পাঠাতে হবে
            logOut(); 
            navigate("/login");
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // গুগল লগইন হ্যান্ডলার
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Login Successful with Google!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-8">Create Account</h2>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2 text-left">Full Name</label>
            <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none" placeholder="Enter your name" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2 text-left">Email Address</label>
            <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none" placeholder="name@example.com" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2 text-left">Photo URL</label>
            <input type="text" name="photo" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none" placeholder="Link to your profile picture" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2 text-left">Password</label>
            <input type="password" name="password" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none" placeholder="••••••••" />
            {error && <p className="text-red-500 text-xs mt-2 font-medium text-left">{error}</p>}
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg">
            Register Now
          </button>
        </form>

        <div className="divider my-6 text-gray-400 text-sm">OR</div>

        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all mb-6">
          <FcGoogle className="text-2xl" /> Sign up with Google
        </button>

        <p className="text-center text-gray-600 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
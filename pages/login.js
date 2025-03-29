import { useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1F1F39]">
      <div className="relative w-96  bg-[#2F2F42] rounded-2xl shadow-lg p-6 text-white">
        <h2 className="text-center text-3xl font-bold mt-4">Log In</h2>

        {/* Email Input */}
        <div className="mt-10">
          <label className="text-sm text-gray-400">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mt-2 bg-[#3E3E55] border-none rounded-md text-white placeholder-gray-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mt-6 relative">
          <label className="text-sm text-gray-400">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 mt-2 bg-[#3E3E55] border-none rounded-md text-white placeholder-gray-400 pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute top-4 right-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEye size={18} /> : <IoEyeOff size={18} />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <Link href="/forgot-password" className="text-blue-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Log In Button */}
        <Link href="/landing">
  <button className="w-full mt-6 bg-blue-600 py-3 rounded-md hover:bg-blue-700 transition text-lg font-medium">
    Log In
  </button>
</Link>

        {/* Sign Up Redirect */}
        <p className="text-center mt-4 text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>

        {/* Social Login */}
        <div className="text-center text-sm text-gray-400 mt-6">Or login with</div>
        <div className="flex justify-center gap-6 mt-4">
      <button className="rounded-full shadow-md ">
        <FaGoogle size={24} />
      </button>
      <button className="rounded-full shadow-md ">
        <FaFacebook size={24} />
      </button>
    </div>
      </div>
    </div>
  );
}

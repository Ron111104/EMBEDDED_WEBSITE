import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1F1F39]">
      <div className="bg-[#2F2F42] p-8 rounded-xl w-96 shadow-lg text-white relative">
        <h2 className="text-center text-2xl font-semibold">Sign Up</h2>
        <p className="text-center text-gray-400 text-sm mt-1">
          Enter your details below & free sign up
        </p>

        {/* Email Input */}
        <div className="mt-6">
          <label className="block text-sm text-gray-300">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mt-2 bg-[#0A0E1A] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Cooper_Kristin@gmail.com"
          />
        </div>

        {/* Password Input */}
        <div className="mt-4 relative">
          <label className="block text-sm text-gray-300">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 mt-2 bg-[#0A0E1A] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="************"
          />
          <button
            className="absolute right-3 top-10 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Create Account Button */}
        <button className="w-full mt-6 bg-blue-600 py-2 rounded-md hover:bg-blue-700 transition font-semibold">
          Create account
        </button>

        {/* Terms & Conditions Checkbox */}
        <div className="mt-4 flex items-center text-sm text-gray-400">
          <input type="checkbox" className="mr-2" />
          <span>By creating an account, you have to agree with our terms & conditions.</span>
        </div>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
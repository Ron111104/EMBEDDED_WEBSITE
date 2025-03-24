"use client";

import { useState, useEffect } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import { CheckIcon } from 'lucide-react';
export default function ForgotPassword() {
  const [step, setStep] = useState(1);

  // Form states
  const [email, setEmail] = useState("Cooper_Kristin@gmail.com");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30); // 30 seconds
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only one digit

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move focus to next input if value is entered
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // Handle Backspace for seamless deletion
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otp];

      if (otp[index]) {
        updatedOtp[index] = ""; // Clear the current box
      } else if (index > 0) {
        updatedOtp[index - 1] = ""; // Move focus back and clear previous box
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
      setOtp(updatedOtp);
    }
  };

  // Countdown timer for "Resend code in 00:30"
  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Reset the countdown when user enters step 2
  useEffect(() => {
    if (step === 2) {
      setCountdown(30);
    }
  }, [step]);

  // Resend code function (reset OTP & timer)
  const handleResendCode = () => {
    setOtp(["", "", "", "", "", ""]);
    setCountdown(30);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1F1F39] px-4">
      <div className="bg-[#2F2F42] w-full max-w-md rounded-xl p-10 shadow-lg text-white space-y-8">
        {/* Step 1: Forgot Password */}
        {step === 1 && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#3E3E55] border border-gray-600 rounded-md text-white placeholder-gray-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#3D5CFF] py-3 rounded-md hover:bg-blue-600 transition font-medium"
            >
              Send Code
            </button>
            <p className="text-sm text-gray-400">
              Remember the password?{" "}
              <span className="text-blue-500 hover:underline cursor-pointer">
                Sign up
              </span>
            </p>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold">OTP Verification</h2>
            <p className="text-sm text-gray-400">
              Please check your mail id. We&apos;ve sent a code to{" "}
              <span className="text-gray-300">{email}</span>
            </p>
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl bg-white border border-gray-600 rounded-md text-gray-500 focus:outline-none"
                />
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-[#3D5CFF] py-3 rounded-md hover:bg-blue-600 transition font-medium"
            >
              Verify
            </button>
            <div className="text-sm text-gray-400">
              {countdown > 0 ? (
                <span>Resend code in 00:{String(countdown).padStart(2, "0")}</span>
              ) : (
                <button
                  onClick={handleResendCode}
                  className="text-blue-500 hover:underline"
                >
                  Resend code
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold">Reset Password</h2>
            <div className="relative">
              <label className="block text-sm text-gray-300 mb-2">
                New Password
              </label>
              <input
                type={showNewPass ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#3E3E55] border border-gray-600 rounded-md text-white placeholder-gray-500 pr-12"
                placeholder="********"
              />
              <button
                type="button"
                className="absolute right-3 top-11 text-gray-400"
                onClick={() => setShowNewPass(!showNewPass)}
              >
                {showNewPass ? <IoEye /> : <IoEyeOff />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type={showConfirmPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#3E3E55] border border-gray-600 rounded-md text-white placeholder-gray-500 pr-12"
                placeholder="********"
              />
              <button
                type="button"
                className="absolute right-3 top-11 text-gray-400"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <IoEye /> : <IoEyeOff />}
              </button>
            </div>
            <button
              onClick={() => setStep(4)}
              className="w-full bg-[#3D5CFF] py-3 rounded-md hover:bg-blue-600 transition font-medium"
            >
              Reset Password
            </button>
          </div>
        )}
        {/* Step 4: Success */}
        {step === 4 && (
          <div className="py-8 rounded-2xl w-full max-w-sm mx-auto flex flex-col items-center">
          <div className="bg-[#3D5CFF] w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <CheckIcon className="text-white w-8 h-8" />
          </div>
          
          <h2 className="text-white text-xl font-medium mb-1">Success</h2>
          
          <p className="text-gray-400 text-sm mb-6">
            Congratulations, you have reset your password
          </p>
          <Link href="/login" className="w-full">
        <button className="w-full bg-[#3D5CFF] text-white py-3 rounded-md hover:bg-blue-700 transition font-medium">
          Done
        </button>
      </Link>
        </div>
        )}
      </div>
    </div>
  );
}

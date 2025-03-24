import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [step, setStep] = useState(1); // 1 = Splash 1, 2 = Splash 2, 3 = Landing

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 2000); // Show Splash 2 after 2s
    const timer2 = setTimeout(() => setStep(3), 4000); // Show Landing after another 2s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1F1F39] text-white p-8 transition-all duration-700">
      {step === 1 && <SplashScreen image="/images/splash1.jpg" text="Numerous free trial courses" subtext="Free courses for you to find your way in learning" step={1} />}
      {step === 2 && <SplashScreen image="/images/splash2.jpg" text="Quick and easy learning" subtext="Easy and fast learning at any time to help you progress" step={2} />}
      {step === 3 && <LandingPage />}
    </div>
  );
}

// ✅ Splash Screen Component with Dynamic Loading Indicator
function SplashScreen({ image, text, subtext, step }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Skip Button (Top Right) */}
      <button className="absolute top-6 right-6 text-gray-300 text-sm">Skip</button>

      {/* Illustration */}
      <div className="relative w-64 h-64 mb-6">
        <Image src={image} alt="Splash Illustration" layout="fill" objectFit="contain" />
      </div>

      {/* Text */}
      <h1 className="text-2xl font-semibold">{text}</h1>
      <p className="text-gray-400 mt-2">{subtext}</p>

      {/* Dynamic Loading Indicator */}
      <div className="flex space-x-2 mt-6">
        <span className={`w-3 h-3 rounded-full ${step === 1 ? "bg-white" : "bg-gray-500"} animate-pulse`} />
        <span className={`w-3 h-3 rounded-full ${step === 2 ? "bg-white" : "bg-gray-500"} animate-pulse`} />
        <span className={`w-3 h-3 rounded-full ${step === 3 ? "bg-white" : "bg-gray-500"}`} />
      </div>
    </div>
  );
}

// ✅ Landing Page Component
function LandingPage() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Illustration */}
      <div className="relative w-64 h-64 mb-6">
        <Image src="/images/landing.jpg" alt="Landing Illustration" layout="fill" objectFit="contain" />
      </div>

      {/* Text */}
      <h1 className="text-3xl font-semibold">Create your own study plan</h1>
      <p className="text-gray-400 mt-2">Study according to the study plan to make study more motivated</p>

      {/* Buttons (Sign Up / Log In) */}
      <div className="mt-6 space-x-4">
        <Link href="/signup" className="bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Sign Up
        </Link>
        <Link href="/login" className="bg-gray-600 px-6 py-2 rounded-md hover:bg-gray-700 transition">
          Log In
        </Link>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { User, Lock, Eye, EyeOff, Mail } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import Cookie from 'js-cookie';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        toast.success("ورود موفقیت آمیز!", {
          position: "bottom-center",
          duration: 3000,
          style: {
            background: "#10B981",
            color: "#ffffff",
            direction: "rtl",
          },
        });

        // Redirect to home page after successful login
        setTimeout(() => {
            const response = {
                token : "asdadsjadef;kvbakjdzs;aoisdcvaamdpoa",
                expire : 7
            }
            Cookie.set("token",response.token , {expires : response.expire})
            redirect("/dashboard")
        }, 1000);

      } else {
        toast.error("نام کاربری یا رمز عبور اشتباه است.", {
          position: "bottom-center",
          duration: 3000,
          style: {
            background: "#EF4444",
            color: "#ffffff",
            direction: "rtl",
          },
        });
        setIsLoading(false);
      }
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 rtl">
      <Toaster position="bottom-center" />
      <Container size="sm">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Decorative Header */}
          <div className="h-12 bg-gradient-to-l from-sky-500 to-blue-600"></div>

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center shadow-md">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                ورود به حساب کاربری
              </h1>
              <p className="text-gray-500 text-sm">
                لطفا اطلاعات خود را وارد کنید
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="نام کاربری یا ایمیل"
                  rtl={true}
                  fullWidth={true}
                  icon={<User size={18} />}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  onKeyDown={handleKeyDown}
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور"
                  rtl={true}
                  fullWidth={true}
                  icon={<Lock size={18} />}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onKeyDown={handleKeyDown}
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600"
                  aria-label={
                    showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm">
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:text-blue-800"
                >
                  فراموشی رمز عبور
                </Link>
                <div className="flex items-center">
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-gray-600"
                  >
                    مرا به خاطر بسپار
                  </label>
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth={true}
                onClick={handleLogin}
                disabled={isLoading}
                className="mt-8 bg-gradient-to-l from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 transition-all duration-300 text-base py-3 rounded-xl shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    در حال ورود...
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  "ورود به حساب"
                )}
              </Button>
            </div>

            {/* Divider */}
            <div className="mt-10 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">یا ادامه با</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full rounded-xl transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 flex justify-center items-center gap-2"
              >
                <span>گوگل</span>
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 flex justify-center items-center gap-2"
              >
                <span>تلگرام</span>
              </Button>
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center text-sm">
              <span className="text-gray-500">حساب کاربری ندارید؟</span>
              <Link
                href="/register"
                className="mr-1 text-blue-600 hover:text-blue-800 font-medium"
              >
                ثبت‌نام کنید
              </Link>
            </div>
          </div>

          {/* Decorative Footer */}
          <div className="h-1 bg-gradient-to-l from-purple-400 via-pink-500 to-red-500"></div>
        </div>
      </Container>
    </div>
  );
};

export default Login;

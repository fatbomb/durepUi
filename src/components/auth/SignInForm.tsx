import { EyeCloseIcon, EyeIcon } from "../../icons";
import { Link, useNavigate } from "react-router";

import Button from "../ui/button/Button";
import Checkbox from "../form/input/Checkbox";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { loginSchema } from "../../schemas/login.schema";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginFormData = {
  email: string;
  password: string;
  keepLoggedIn: boolean;
};

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });

      if (result) {
        toast.success("Login successful!");
        navigate('/dashboard');
        // window.location.reload();
      } else if (error) {
        toast.error(error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <title>Sign In</title>
      <div className="flex flex-col flex-1">
        {/* <div className="mx-auto pt-10 w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-400 text-sm transition-colors"
          >
            <ChevronLeftIcon className="size-5" />
            Back to dashboard
          </Link>
        </div> */}
        <div className="flex flex-col flex-1 justify-center mx-auto w-full max-w-md">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md dark:text-white/90">
                Sign In
              </h1>
            </div>
            <div>
              {/* <div className="flex flex-col items-center mb-4">
                <h2 className="mb-2 font-semibold text-gray-700 dark:text-white text-base">
                  Sign in with institutional email
                </h2>
                <SignInWithGoogle />
              </div> */}
              {/* <div className="relative py-3 sm:py-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-gray-200 dark:border-gray-800 border-t w-full"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-900 p-2 sm:px-5 sm:py-2 text-gray-400">
                    Or
                  </span>
                </div>
              </div> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input
                      placeholder="info@gmail.com"
                      {...register("email")}
                      error={!!errors.email}
                      hint={errors.email?.message}
                    />
                  </div>
                  <div>
                    <Label>
                      Password <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password")}
                        error={!!errors.password}
                        hint={errors.password?.message}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="top-1/2 right-4 z-30 absolute -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Checkbox {...register("keepLoggedIn")} />
                      <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                        Keep me logged in
                      </span>
                    </div>
                    <Link
                      to="/reset-password"
                      className="text-brand-500 hover:text-brand-600 dark:text-brand-400 text-sm"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div>
                    <Button disabled={loading} className="w-full" size="sm">
                      {loading ? "Signing in..." : "Sign in"}
                    </Button>
                  </div>
                </div>
              </form>

              <div className="mt-5">
                <p className="font-normal text-gray-700 dark:text-gray-400 text-sm text-center sm:text-start">
                  Don&apos;t have an account? {""}
                  <Link
                    to="/signup"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
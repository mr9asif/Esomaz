import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Input from "@/components/ui/Input";
import { queryClient } from "@/lib/react_query";
import { useAuth } from "@/provider/UseAuth";

import { useLogin } from "../features/auth/hooks/useLogin";
import {
  loginSchema,
  type LoginFormData,
} from "../features/auth/schemas/login.schema";

const LoginForm = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Already logged in
  if (user) {
    return <Navigate to="/home" replace />;
  }

  // Normal login
  const onSubmit = (values: LoginFormData) => {
    mutate(values, {
      onSuccess: async () => {
        toast.success("Login successful");

        await queryClient.invalidateQueries({
          queryKey: ["me"],
        });

        navigate("/home");
      },

      onError: () => {
        toast.error("Invalid credentials");
      },
    });
  };

  // Quick login
  const handleQuickLogin = (identifier: string, password: string) => {
    if (!identifier || !password) {
      toast.error("Development credentials are missing");
      return;
    }

    mutate(
      {
        identifier,
        password,
      },
      {
        onSuccess: async () => {
          toast.success("Logged in as Raju");

          await queryClient.invalidateQueries({
            queryKey: ["me"],
          });

          navigate("/home");
        },

        onError: () => {
          toast.error("Quick login failed");
        },
      },
    );
  };

  // Google login
  const handleGoogleLogin = async (credential: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!apiUrl) {
        toast.error("API URL is not configured");
        return;
      }

      const response = await fetch(`${apiUrl}/v1/auth/google`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          idToken: credential,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Google login failed");
      }

      toast.success("Google login successful");

      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      navigate("/home");
    } catch (error) {
      console.error("Google login error:", error);

      toast.error(
        error instanceof Error ? error.message : "Google login failed",
      );
    }
  };

  return (
    <>
      {/* Back */}
      <Link
        to="/home"
        className="mb-6 inline-flex items-center gap-2 text-gray-600 transition hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to home
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Login to eSomaz</h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Please login to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Identifier */}
        <Input
          label="Email or Username"
          placeholder="Enter email or username"
          {...register("identifier")}
          error={errors.identifier?.message}
        />

        {/* Password */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-500 transition hover:text-black"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
          </button>
        </div>

        {/* Login */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer rounded-lg bg-black py-2.5 text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Google Login */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-gray-500">OR</span>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (!credentialResponse.credential) {
              toast.error("Google authentication failed");
              return;
            }

            handleGoogleLogin(credentialResponse.credential);
          }}
          onError={() => {
            toast.error("Google login failed");
          }}
          useOneTap={false}
        />
      </div>

      {/* Register */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Create account
        </Link>
      </p>

      {/* ================================ */}
      {/* DEVELOPMENT ONLY - QUICK LOGIN */}
      {/* ================================ */}

      {import.meta.env.DEV && (
        <div className="mt-8 border-t border-dashed border-gray-200 pt-5">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-gray-400">
            Quick Login
          </p>

          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              handleQuickLogin(
                import.meta.env.VITE_DEV_RAJU_EMAIL,
                import.meta.env.VITE_DEV_RAJU_PASSWORD,
              )
            }
            className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            👤 Login as Raju
          </button>
        </div>
      )}
    </>
  );
};

export default LoginForm;

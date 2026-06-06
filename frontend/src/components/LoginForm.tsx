import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import Input from "@/components/ui/Input";
import { queryClient } from "@/lib/react_query";

import { useLogin } from "../features/auth/hooks/useLogin";
import {
    loginSchema,
    type LoginFormData,
} from "../features/auth/schemas/login.schema";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] =
  useState(false);

  const { mutate, isPending } =
    useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),
  });

  const onSubmit = (
    values: LoginFormData
  ) => {
    mutate(values, {
      onSuccess: async () => {
        toast.success(
          "Login successful"
        );

        await queryClient.invalidateQueries({
          queryKey: ["me"],
        });

        navigate("/");
      },

      onError: () => {
        toast.error(
          "Invalid credentials"
        );
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <Input
        label="Email or Username"
        placeholder="Enter email or username"
        {...register(
          "identifier"
        )}
        error={
          errors.identifier
            ?.message
        }
      />

      <div>
  <label className="block text-sm font-medium mb-1 text-left">
    Password
  </label>

  <div className="relative">
    <input
      type={
        showPassword
          ? "text"
          : "password"
      }
      {...register("password")}
      className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          text-left
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
        "
      placeholder="Enter password"
    />

    <button
      type="button"
      onClick={() =>
        setShowPassword(
          !showPassword
        )
      }
      className="absolute right-3 top-3"
    >
      {showPassword ? (
         <FiEye />
      
      ) : (
         <FiEyeOff />
      )}
    </button>
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">
      {errors.password.message}
    </p>
  )}
</div>
<button
  type="button"
 className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition "
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="google"
    className="w-5 h-5"
  />

  Continue with Google
</button>
<div className="flex items-center gap-3">
  <div className="h-px flex-1 bg-gray-200" />

  <span className="text-sm text-gray-500">
    OR
  </span>

  <div className="h-px flex-1 bg-gray-200" />
</div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {isPending
          ? "Logging in..."
          : "Login"}
      </button>
      <p className="text-center text-sm">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-blue-600 font-medium"
  >
    Register
  </Link>
</p>
    </form>
  );
};

export default LoginForm;
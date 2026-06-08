import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";


import Input from "@/components/ui/Input";

import {
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/schemas/register.schema";
import { useAuth } from "@/provider/UseAuth";
import { ArrowLeft } from "lucide-react";
import { useRegister } from "../features/auth/hooks/useRegister";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const { mutate, isPending } =
    useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(registerSchema),
  });

    if (user) {
    return <Navigate to="/" replace />;
}
  const onSubmit = (
    values: RegisterFormData
  ) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(
          "Registration successful"
        );

        navigate("/login");
      },

   onError: (error) => {
  if (error instanceof AxiosError) {
    toast.error(
      error.response?.data?.message ||
        "Registration failed"
    );

    return;
  }

  toast.error("Registration failed");
},
    });
  };

  return (
    <>
    <Link
  to="/"
  className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-6"
>
  <ArrowLeft size={18} />
  Back to Home
</Link>
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <Input
        label="Full Name"
        placeholder="Enter your name"
        {...register("name")}
        error={
          errors.name?.message
        }
      />

      <Input
        label="Username"
        placeholder="Choose a username"
        {...register("username")}
        error={
          errors.username?.message
        }
      />

      <Input
        label="Email"
        placeholder="Enter your email"
        {...register("email")}
        error={
          errors.email?.message
        }
      />

      <div>
        <label className="block text-sm font-medium mb-2">
          Password
        </label>

        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            {...register(
              "password"
            )}
            placeholder="Create password"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              pr-10
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2"
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
            {
              errors.password
                .message
            }
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-xl
          hover:bg-blue-700
          transition
        "
      >
        {isPending
          ? "Creating account..."
          : "Create Account"}
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-medium"
        >
          Login
        </Link>
      </p>
    </form>
    </>
  );

};

export default RegisterForm;
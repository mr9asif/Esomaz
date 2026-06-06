import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({
  label,
  error,
  ...props
}: InputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 text-left">
        {label}
      </label>

      <input
        {...props}
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
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
import React, { useState } from "react";
import "../App.css";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  loading?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const baseStyles =
    "w-full rounded-md focus:outline-none focus:ring-2 transition";

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantStyles = {
    filled: "h-8 md:h-12 rounded-xl bg-gray-200 text-black w-sm md:w-xs px-3 md:px-4 focus:outline-none focus:shadow-inner shadow-lg transition-all text-sm md:text-base border border-[#4a4a4a] focus:border-black",
    outlined: "h-8 md:h-12 rounded-xl text-black w-sm md:w-xs px-3 md:px-4 focus:outline-none focus:shadow-inner shadow-lg transition-all text-sm md:text-base border border-[#4a4a4a] focus:border-black",
    ghost: "h-8 md:h-12 bg-transparent border-b w-sm md:w-xs border-gray-300 focus:ring-blue-500",
  };

  const stateStyles = disabled
    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
    : invalid
    ? "border-red-500 focus:ring-red-500"
    : "";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="relative flex items-center">
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${stateStyles}`}
        />

        {/* Loading spinner */}
        {loading && (
          <span className="absolute right-2 animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-4 h-4"></span>
        )}

        {/* Password toggle */}
        {type === "password" && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute max-[321px]:left-63 max-[415px]:left-85 md:left-70 text-xs text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {helperText && !invalid && (
        <p className="text-xs text-gray-500 ">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;

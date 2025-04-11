import * as React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "./input";

interface PasswordInputProps extends React.ComponentProps<"input"> {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

function PasswordInput({ className, showPassword, setShowPassword, ...props }: PasswordInputProps) {
  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        className={`pr-10 ${className}`} 
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </button>
    </div>
  );
}

export { PasswordInput };

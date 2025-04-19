"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rtl?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      rtl = false,
      fullWidth = false,
      icon,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputClasses = [
      "px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400",
      "focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
      "disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
      error ? "border-red-500" : "border-slate-300",
      rtl ? "text-right" : "text-left",
      fullWidth ? "w-full" : "",
      icon ? "pl-9" : "",
      className,
    ].join(" ");

    return (
      <div
        className={`${fullWidth ? "w-full" : ""} ${
          rtl ? "text-right" : "text-left"
        }`}
      >
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input ref={ref} className={inputClasses} {...props} />
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

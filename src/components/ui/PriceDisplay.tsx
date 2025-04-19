import React from "react";

interface PriceDisplayProps {
  label: string;
  amount: string | number;
  currency?: string;
  className?: string;
  highlight?: boolean;
}

const PriceDisplay = ({
  label,
  amount,
  currency = "$",
  className = "",
  highlight = false,
}: PriceDisplayProps) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <span className={`${highlight ? "font-bold" : "font-medium"} rtl`}>
        {label}
      </span>
      <span className={highlight ? "text-sky-600 font-bold" : "font-medium"}>
        {amount}
        {currency}
      </span>
    </div>
  );
};

export default PriceDisplay;

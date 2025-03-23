import { cn } from "@/lib/utils";
import "@/modules/styles/spinner.css";
import React from "react";

interface SpinnerIconProps {
  size?: number;

  className?: string;
  color?: string;
}

export const Spinner: React.FC<SpinnerIconProps> = ({
  size = 12,
  className,
  color,
}) => {
  return (
    <div
      className={cn(`spinner`, className)}
      style={{
        width: `${size * 4}px`,
        height: `${size * 4}px`,
        borderBottomColor: `${color}`,
      }}
    />
  );
};

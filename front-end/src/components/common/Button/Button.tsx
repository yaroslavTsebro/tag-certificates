import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

export type ButtonProps = {
  children: ReactNode;
  className?: string;
  style?: "purple" | "red" | "green";
   onClick?: (...args: any[]) => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  style = "purple",
  onClick,
}) => {
  const buttonColor = "button" + style[0].toUpperCase() + style.substring(1);
  const buttonClass = `${styles[buttonColor]} ${className}`.trim();

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;

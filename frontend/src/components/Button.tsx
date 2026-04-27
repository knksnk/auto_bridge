import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "dark" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "ui-button ui-button-primary",
  dark: "ui-button ui-button-dark",
  ghost: "ui-button ui-button-ghost",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button className={`${variantClass[variant]} ${className}`.trim()} type={type} {...props}>
      {children}
    </button>
  );
}

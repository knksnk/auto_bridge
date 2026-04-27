import type { HTMLAttributes, PropsWithChildren } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "article" | "section" | "div";
}

export function Card({ as: Component = "article", className = "", children, ...props }: PropsWithChildren<CardProps>) {
  return (
    <Component className={`card ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

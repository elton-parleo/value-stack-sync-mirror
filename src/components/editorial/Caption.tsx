import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
};

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const Caption = ({ children, align = "left", className = "" }: Props) => (
  <p
    className={`font-mono text-[10.5px] uppercase tracking-[0.22em] text-foreground/45 ${alignMap[align]} ${className}`}
  >
    {children}
  </p>
);

export default Caption;

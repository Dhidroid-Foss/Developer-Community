import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-xs font-extrabold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--orange)] px-5 py-3 text-zinc-950 hover:-translate-y-0.5 hover:bg-[#ff825c]",
        outline: "border border-white/40 px-5 py-3 text-white hover:-translate-y-0.5 hover:bg-white hover:text-zinc-950",
        dark: "bg-zinc-950 px-5 py-3 text-white hover:-translate-y-0.5 hover:bg-zinc-800",
      },
      size: { default: "", sm: "px-4 py-2.5 text-[11px]" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };

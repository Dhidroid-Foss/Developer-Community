import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
  <input type={type} className={cn("flex h-11 w-full rounded-full border-0 bg-white px-4 text-xs text-zinc-950 outline-none placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-950", className)} ref={ref} {...props} />
));
Input.displayName = "Input";

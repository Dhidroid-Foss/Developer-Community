"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type * as React from "react";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;
export const TabsContent = TabsPrimitive.Content;
export const TabsList = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => <TabsPrimitive.List className={cn("flex overflow-x-auto border-b border-[var(--line)]", className)} {...props} />;
export const TabsTrigger = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => <TabsPrimitive.Trigger className={cn("shrink-0 border-b-2 border-transparent px-4 py-4 text-[11px] font-semibold text-zinc-500 transition data-[state=active]:border-[var(--orange)] data-[state=active]:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]", className)} {...props} />;

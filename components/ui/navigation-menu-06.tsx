"use client";

import {
  BookOpen,
  Briefcase,
  Code2,
  Users,
  GraduationCap,
  FolderGit2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const exploreItems: {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Blog & Notes",
    href: "/blog",
    description: "Deep-dives into React, Next.js, Node.js, AI, and systems engineering.",
    icon: BookOpen,
  },
  {
    title: "Member Works",
    href: "/works",
    description: "Real-world production case studies, architectures, and client shipping stories.",
    icon: Briefcase,
  },
  {
    title: "Tech Stack",
    href: "/stack",
    description: "Curated blueprints and frameworks powering modern high-scale apps.",
    icon: Code2,
  },
  {
    title: "Developers",
    href: "/developers",
    description: "Meet core contributors, full-stack builders, and open-source engineers.",
    icon: Users,
  },
  {
    title: "Skill Cohorts",
    href: "/cohorts",
    description: "Hands-on engineering clinics, architecture audits, and live pairing.",
    icon: GraduationCap,
  },
  {
    title: "Open Resources",
    href: "/resources",
    description: "Boilerplates, design tokens, starter repos, and developer guides.",
    icon: FolderGit2,
  },
];

export default function RichNavigationMenu({ isDark = true }: { isDark?: boolean }) {
  return (
    <NavigationMenu className="z-20">
      <NavigationMenuList className="gap-1">
        {/* Explore Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "text-xs font-semibold data-[state=open]:text-[var(--orange)] bg-transparent transition-colors",
              isDark
                ? "text-stone-200 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white"
                : "text-stone-700 hover:text-stone-950 hover:bg-stone-900/5 focus:bg-stone-900/5 focus:text-stone-950"
            )}
          >
            Explore
          </NavigationMenuTrigger>
          <NavigationMenuContent className="px-0 py-1 border border-zinc-800 bg-zinc-950 text-white shadow-2xl">
            <div className="grid w-[680px] grid-cols-3 gap-3 divide-x divide-zinc-800/80 p-4">
              <div className="col-span-2 pe-2">
                <h6 className="pl-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#fa6739]">
                  Community Platforms
                </h6>
                <ul className="mt-2.5 grid grid-cols-2 gap-2">
                  {exploreItems.map((item) => (
                    <ListItem
                      href={item.href}
                      icon={item.icon}
                      key={item.title}
                      title={item.title}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </div>

              <div className="pl-4">
                <h6 className="pl-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#fa6739]">
                  Featured Sprints
                </h6>
                <ul className="mt-2.5 grid gap-2">
                  {exploreItems.slice(0, 3).map((item) => (
                    <ListItem
                      href={item.href}
                      icon={item.icon}
                      key={item.title}
                      title={item.title}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Direct Links */}
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "text-xs font-semibold bg-transparent transition-colors",
                isDark
                  ? "text-stone-200 hover:text-[var(--orange)] hover:bg-white/5 focus:bg-white/5 focus:text-[var(--orange)]"
                  : "text-stone-700 hover:text-[var(--orange)] hover:bg-stone-900/5 focus:bg-stone-900/5 focus:text-[var(--orange)]"
              )}
            >
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/works" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "text-xs font-semibold bg-transparent transition-colors",
                isDark
                  ? "text-stone-200 hover:text-[var(--orange)] hover:bg-white/5 focus:bg-white/5 focus:text-[var(--orange)]"
                  : "text-stone-700 hover:text-[var(--orange)] hover:bg-stone-900/5 focus:bg-stone-900/5 focus:text-[var(--orange)]"
              )}
            >
              Works
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/developers" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "text-xs font-semibold bg-transparent transition-colors",
                isDark
                  ? "text-stone-200 hover:text-[var(--orange)] hover:bg-white/5 focus:bg-white/5 focus:text-[var(--orange)]"
                  : "text-stone-700 hover:text-[var(--orange)] hover:bg-stone-900/5 focus:bg-stone-900/5 focus:text-[var(--orange)]"
              )}
            >
              Developers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: LucideIcon }
>(({ className, title, children, icon: Icon, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href ?? "#"}
          className={cn(
            "group block select-none rounded-lg p-2.5 leading-none no-underline outline-none transition-all hover:bg-white/5 focus:bg-white/5",
            className,
          )}
          ref={ref as any}
          {...props}
        >
          <div className="flex items-center gap-2 text-xs font-bold leading-none text-stone-100 group-hover:text-[var(--orange)] transition-colors">
            <Icon className="h-4 w-4 text-[var(--orange)] shrink-0" />
            {title}
          </div>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-stone-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

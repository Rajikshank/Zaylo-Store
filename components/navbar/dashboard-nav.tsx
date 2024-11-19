"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav({
  allLinks,
}: {
  allLinks: { label: string; path: string; icon: JSX.Element }[];
}) {
  const pathname = usePathname();
  return (
    <nav className="py-2 overflow-auto ">
      <ul className="flex gap-6 font-lg font-bold text-xs ">
        <AnimatePresence>
          {allLinks.map((link) => (
            <motion.li key={link.path} whileTap={{ scale: 0.95 }}>
              <Link
                href={link.path}
                className={cn(
                  "flex gap-1 flex-col items-center relative",
                  pathname === link.path && "text-primary"
                )}
              >
                {link.icon}
                {link.label}
                {pathname === link.path ? (
                  <motion.div
                    className="h-[3px] w-full rounded-full absolute bg-primary z-0 left-0  -bottom-1"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 35 }}
                  />
                ) : null}
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </nav>
  );
}

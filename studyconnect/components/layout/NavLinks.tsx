"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";

type NavLinksProps = {
  className?: string;
  linkClassName?: string;
  /** Called after a link is clicked (used to close the mobile menu). */
  onNavigate?: () => void;
};

export default function NavLinks({
  className,
  linkClassName,
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`${linkClassName ?? ""} ${
                isActive ? "bg-white/15 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/assignments", label: "Assignments" },
  { href: "/groups", label: "Study Groups" },
  { href: "/materials", label: "Materials" },
];

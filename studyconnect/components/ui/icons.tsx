import type { ReactNode } from "react";

type IconProps = { className?: string };

function Icon({
  className = "size-5",
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.25 2.5 2.5 4.5-5" />
    </Icon>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Icon>
  );
}

export function AlertIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.75v5M12 16.25h.01" />
    </Icon>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
      <path d="M8 3.75v3.5M16 3.75v3.5M4 10h16" />
    </Icon>
  );
}

export function ListIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M8.5 7h10M8.5 12h10M8.5 17h10M4.75 7h.01M4.75 12h.01M4.75 17h.01" />
    </Icon>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M15.75 19.25v-1.5a3.25 3.25 0 0 0-3.25-3.25h-5a3.25 3.25 0 0 0-3.25 3.25v1.5m14.5 0v-1.5a3.25 3.25 0 0 0-2.5-3.16m-2.25-11a3.25 3.25 0 0 1 0 6.32M10 8a3.25 3.25 0 1 1-6.5 0A3.25 3.25 0 0 1 10 8Z" />
    </Icon>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4.75 5.75c2.6-.9 5-.55 7.25 1v13c-2.25-1.55-4.65-1.9-7.25-1v-13Zm14.5 0c-2.6-.9-5-.55-7.25 1v13c2.25-1.55 4.65-1.9 7.25-1v-13Z" />
    </Icon>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Icon>
  );
}

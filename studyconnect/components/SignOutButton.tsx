"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-lg border border-white/50 px-3 py-1.5 text-sm font-medium hover:bg-emerald-900"
    >
      Sign out
    </button>
  );
}

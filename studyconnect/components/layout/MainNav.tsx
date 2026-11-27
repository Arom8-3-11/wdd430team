"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import NavLinks from "./NavLinks";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Inline links on md+ screens, a toggleable menu panel on small screens. */
export default function MainNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      buttonRef.current?.focus();
    }
  }

  return (
    <nav aria-label="Main navigation" onKeyDown={handleKeyDown}>
      <NavLinks
        className="hidden gap-x-1 text-sm font-medium md:flex"
        linkClassName={`inline-flex min-h-11 items-center rounded-md px-3 hover:bg-white/10 ${focusRing}`}
      />

      <button
        ref={buttonRef}
        type="button"
        aria-label="Main menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((current) => !current)}
        className={`inline-flex size-11 items-center justify-center rounded-md hover:bg-white/10 md:hidden ${focusRing}`}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full border-t border-white/10 bg-emerald-800 px-4 pb-3 pt-2 shadow-lg md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <NavLinks
          className="flex flex-col gap-1 text-base font-medium"
          linkClassName={`flex min-h-12 items-center rounded-md px-3 hover:bg-white/10 ${focusRing}`}
          onNavigate={() => setOpen(false)}
        />
      </div>
    </nav>
  );
}

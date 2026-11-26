"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function RouteError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:py-12">
      <ErrorState
        message="An unexpected error occurred while loading this page. Try again, and if it keeps happening, come back in a little while."
        onRetry={reset}
      />
    </div>
  );
}

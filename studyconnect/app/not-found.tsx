import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import { primaryButton } from "@/components/ui/button-styles";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:py-12">
      <EmptyState
        title="Page not found"
        description="We couldn't find the page you were looking for. It may have moved, or the link may be incorrect."
        action={
          <Link href="/dashboard" className={primaryButton}>
            Go to dashboard
          </Link>
        }
      />
    </div>
  );
}

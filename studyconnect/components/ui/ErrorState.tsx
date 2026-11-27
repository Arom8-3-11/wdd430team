import { AlertIcon } from "@/components/ui/icons";
import { secondaryButton } from "@/components/ui/button-styles";

type ErrorStateProps = {
  message: string;
  title?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message,
  title = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center sm:py-16"
    >
      <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-red-100 text-red-700">
        <AlertIcon className="size-7" />
      </span>
      <h2 className="text-lg font-semibold tracking-tight text-red-950">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-red-900">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className={`mt-6 ${secondaryButton}`}
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

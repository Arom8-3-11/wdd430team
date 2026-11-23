"use client";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  autoComplete?: string;
  errors?: string[];
  disabled?: boolean;
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  required = false,
  autoComplete,
  errors,
  disabled = false,
}: FormFieldProps) {
  const hasErrors = Boolean(errors && errors.length > 0);
  const inputClasses =
    "w-full rounded-lg border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 " +
    (hasErrors ? "border-red-400" : "border-gray-300");

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          disabled={disabled}
          rows={4}
          aria-invalid={hasErrors}
          aria-describedby={hasErrors ? `${id}-errors` : undefined}
          className={inputClasses}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={hasErrors}
          aria-describedby={hasErrors ? `${id}-errors` : undefined}
          className={inputClasses}
        />
      )}

      {hasErrors && (
        <ul
          id={`${id}-errors`}
          className="mt-1 space-y-0.5 text-sm text-red-600"
        >
          {errors?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

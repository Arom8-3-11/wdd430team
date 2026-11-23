"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Alert from "./Alert";
import FormField from "./FormField";
import type { FieldErrors } from "@/lib/validation";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data: { message?: string; fieldErrors?: FieldErrors } =
          await response.json();
        setFieldErrors(data.fieldErrors ?? {});
        setFormError(data.message ?? "Registration failed. Try again.");
        return;
      }

      // Account created: sign the student in and go to their profile.
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/signin");
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch {
      setFormError("Could not reach the server. Check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {formError && <Alert kind="error">{formError}</Alert>}

      <FormField
        id="name"
        label="Full name"
        value={name}
        onChange={setName}
        required
        autoComplete="name"
        errors={fieldErrors.name}
        disabled={submitting}
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
        autoComplete="email"
        errors={fieldErrors.email}
        disabled={submitting}
      />
      <FormField
        id="password"
        label="Password (at least 8 characters)"
        type="password"
        value={password}
        onChange={setPassword}
        required
        autoComplete="new-password"
        errors={fieldErrors.password}
        disabled={submitting}
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-emerald-800 px-5 py-3 font-medium text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

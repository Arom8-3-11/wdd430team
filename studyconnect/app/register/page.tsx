import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register | StudyConnect",
  description: "Create a StudyConnect account.",
};

// Session reads must happen inside a <Suspense> boundary (Cache Components).
async function RegisterGate() {
  await connection();
  const session = await auth();
  if (session?.user) {
    redirect("/profile");
  }
  return <RegisterForm />;
}

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-md px-6 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Create account</h1>
      <p className="mb-8 text-gray-600">
        Register to track assignments, share materials, and join study groups.
      </p>

      <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <Suspense fallback={<p className="text-gray-600">Loading…</p>}>
          <RegisterGate />
        </Suspense>
      </section>

      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-emerald-800 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

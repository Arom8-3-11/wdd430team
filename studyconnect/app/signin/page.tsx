import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Sign in | StudyConnect",
  description: "Sign in to your StudyConnect account.",
};

// Session reads must happen inside a <Suspense> boundary (Cache Components).
async function SignInGate() {
  await connection();
  const session = await auth();
  if (session?.user) {
    redirect("/profile");
  }
  return <SignInForm />;
}

export default function SignInPage() {
  return (
    <div className="mx-auto w-full max-w-md px-6 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Sign in</h1>
      <p className="mb-8 text-gray-600">
        Welcome back! Sign in to continue organizing your coursework.
      </p>

      <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <Suspense fallback={<p className="text-gray-600">Loading…</p>}>
          <SignInGate />
        </Suspense>
      </section>

      <p className="mt-6 text-sm text-gray-600">
        New to StudyConnect?{" "}
        <Link
          href="/register"
          className="font-medium text-emerald-800 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

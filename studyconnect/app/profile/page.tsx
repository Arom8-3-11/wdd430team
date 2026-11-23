import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import ProfileManager from "@/components/ProfileManager";

export const metadata: Metadata = {
  title: "My Profile | StudyConnect",
  description: "View and update your StudyConnect profile.",
};

// Session reads must happen inside a <Suspense> boundary (Cache Components).
async function ProfileGate() {
  await connection();
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }
  return <ProfileManager />;
}

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">My Profile</h1>
      <p className="mb-8 text-gray-600">
        View your account details and keep your profile up to date.
      </p>

      <Suspense
        fallback={
          <p role="status" className="text-gray-600">
            Loading your profile…
          </p>
        }
      >
        <ProfileGate />
      </Suspense>
    </div>
  );
}

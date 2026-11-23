import Link from "next/link";
import { connection } from "next/server";
import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";

// Reads the session cookie, so it must render inside a <Suspense> boundary
// (Cache Components is enabled).
export default async function AuthNav() {
  await connection();
  const session = await auth();

  return session?.user ? (
    <>
      <Link href="/profile" className="hover:underline">
        {session.user.name ?? "My Profile"}
      </Link>
      <SignOutButton />
    </>
  ) : (
    <>
      <Link href="/signin" className="hover:underline">
        Sign in
      </Link>
      <Link
        href="/register"
        className="rounded-lg bg-white px-3 py-1.5 text-emerald-800 hover:bg-emerald-50"
      >
        Register
      </Link>
    </>
  );
}

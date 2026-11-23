"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "./Alert";
import FormField from "./FormField";
import type { FieldErrors } from "@/lib/validation";

interface Profile {
  id: string;
  name: string;
  email: string;
  bio: string;
  createdAt: string;
}

export default function ProfileManager() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      try {
        const response = await fetch("/api/profile");
        if (cancelled) return;

        if (response.status === 401) {
          router.push("/signin");
          return;
        }

        if (!response.ok) {
          const data: { message?: string } = await response.json();
          if (!cancelled) {
            setLoadError(data.message ?? "Could not load your profile.");
          }
          return;
        }

        const data: { user: Profile } = await response.json();
        if (cancelled) return;
        setProfile(data.user);
        setName(data.user.name);
        setBio(data.user.bio);
      } catch {
        if (!cancelled) {
          setLoadError("Could not reach the server. Check your connection.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [router, reloadKey]);

  function retryLoad() {
    setLoading(true);
    setLoadError(null);
    setReloadKey((key) => key + 1);
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    setFieldErrors({});

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio }),
      });

      if (response.status === 401) {
        router.push("/signin");
        return;
      }

      if (!response.ok) {
        const data: { message?: string; fieldErrors?: FieldErrors } =
          await response.json();
        setFieldErrors(data.fieldErrors ?? {});
        setSaveError(data.message ?? "Could not save your profile.");
        return;
      }

      const data: { user: Profile } = await response.json();
      setProfile(data.user);
      setName(data.user.name);
      setBio(data.user.bio);
      setSaveSuccess(true);
      router.refresh();
    } catch {
      setSaveError("Could not reach the server. Check your connection.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p role="status" className="text-gray-600">
        Loading your profile…
      </p>
    );
  }

  if (loadError || !profile) {
    return (
      <div>
        <Alert kind="error">
          {loadError ?? "Could not load your profile."}
        </Alert>
        <button
          type="button"
          onClick={retryLoad}
          className="rounded-lg bg-emerald-800 px-5 py-3 font-medium text-white hover:bg-emerald-900"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <dl className="mb-8 grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-gray-500">Email</dt>
          <dd className="text-gray-900">{profile.email}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Member since</dt>
          <dd className="text-gray-900">
            {new Date(profile.createdAt).toLocaleDateString()}
          </dd>
        </div>
      </dl>

      <form
        onSubmit={handleSave}
        noValidate
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Edit profile
        </h2>

        {saveError && <Alert kind="error">{saveError}</Alert>}
        {saveSuccess && <Alert kind="success">Profile saved.</Alert>}

        <FormField
          id="name"
          label="Full name"
          value={name}
          onChange={setName}
          required
          autoComplete="name"
          errors={fieldErrors.name}
          disabled={saving}
        />
        <FormField
          id="bio"
          label="Bio (optional)"
          value={bio}
          onChange={setBio}
          textarea
          errors={fieldErrors.bio}
          disabled={saving}
        />

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-emerald-800 px-5 py-3 font-medium text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}

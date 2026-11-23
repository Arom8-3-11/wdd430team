import { auth } from "@/auth";
import { findUserById, toProfile, updateUserProfile } from "@/lib/users";
import { fieldErrorsFromZod, profileUpdateSchema } from "@/lib/validation";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json(
      { message: "You must be signed in to view your profile." },
      { status: 401 },
    );
  }

  try {
    const user = await findUserById(session.user.id);
    if (!user) {
      return Response.json(
        { message: "Your account could not be found." },
        { status: 404 },
      );
    }

    return Response.json({ user: toProfile(user) });
  } catch (error) {
    console.error("Profile lookup failed:", error);
    return Response.json(
      { message: "Something went wrong loading your profile. Try again." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json(
      { message: "You must be signed in to update your profile." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const parsed = profileUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        message: "Please fix the highlighted fields.",
        fieldErrors: fieldErrorsFromZod(parsed.error),
      },
      { status: 400 },
    );
  }

  try {
    // Only the signed-in student's own document is ever updated.
    const user = await updateUserProfile(session.user.id, parsed.data);
    if (!user) {
      return Response.json(
        { message: "Your account could not be found." },
        { status: 404 },
      );
    }

    return Response.json({ user: toProfile(user) });
  } catch (error) {
    console.error("Profile update failed:", error);
    return Response.json(
      { message: "Something went wrong saving your profile. Try again." },
      { status: 500 },
    );
  }
}

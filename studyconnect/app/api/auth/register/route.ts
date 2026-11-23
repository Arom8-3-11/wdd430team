import { hash } from "bcryptjs";
import { createUser, findUserByEmail, toProfile } from "@/lib/users";
import { fieldErrorsFromZod, registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const parsed = registerSchema.safeParse(body);
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
    const existing = await findUserByEmail(parsed.data.email);
    if (existing) {
      return Response.json(
        {
          message: "An account with this email already exists.",
          fieldErrors: {
            email: ["An account with this email already exists."],
          },
        },
        { status: 409 },
      );
    }

    const passwordHash = await hash(parsed.data.password, 12);
    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
    });

    return Response.json({ user: toProfile(user) }, { status: 201 });
  } catch (error) {
    console.error("Registration failed:", error);
    return Response.json(
      { message: "Something went wrong creating your account. Try again." },
      { status: 500 },
    );
  }
}

import { fail, ok, readJson, validationFail } from "@/lib/api-response";
import { assignmentSchema } from "@/lib/validations/assignment";

/**
 * Stub for the planned `/api/assignments` endpoint (see SPECIFICATION.md).
 * Input validation and error handling are real; persistence (MongoDB) and
 * ownership checks arrive with the authentication work.
 */
export function GET() {
  return ok([]);
}

export async function POST(request: Request) {
  try {
    const body = await readJson(request);

    if (body === null) {
      return fail(400, "INVALID_JSON", "Request body must be valid JSON.");
    }

    const parsed = assignmentSchema.safeParse(body);

    if (!parsed.success) {
      return validationFail(parsed.error);
    }

    // TODO: save to the database once it is configured.
    return ok(parsed.data, 201);
  } catch (error) {
    console.error("POST /api/assignments failed", error);
    return fail(
      500,
      "INTERNAL_ERROR",
      "Something went wrong. Try again later.",
    );
  }
}

import type { ZodError } from "zod";

export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: ApiFieldError[];
  };
};

export function ok<T>(data: T, status = 200) {
  return Response.json({ data }, { status });
}

export function fail(
  status: number,
  code: string,
  message: string,
  details?: ApiFieldError[],
) {
  const body: ApiErrorBody = { error: { code, message, details } };
  return Response.json(body, { status });
}

export function validationFail(error: ZodError) {
  const details = error.issues.map((issue) => ({
    field: issue.path.join(".") || "(body)",
    message: issue.message,
  }));

  return fail(
    422,
    "VALIDATION_ERROR",
    "The submitted data is invalid.",
    details,
  );
}

/** Parses a JSON body; returns null when the body is missing or malformed. */
export async function readJson(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

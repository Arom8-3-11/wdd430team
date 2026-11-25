import { describe, expect, it } from "vitest";
import { GET, POST } from "@/app/api/assignments/route";

function jsonRequest(body: unknown) {
  return new Request("http://localhost/api/assignments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("GET /api/assignments", () => {
  it("returns an empty list for now", async () => {
    const response = GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ data: [] });
  });
});

describe("POST /api/assignments", () => {
  it("returns 201 with the validated assignment", async () => {
    const response = await POST(
      jsonRequest({ title: "Essay draft", dueDate: "2026-12-01T10:00:00Z" }),
    );
    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json.data.title).toBe("Essay draft");
    expect(json.data.status).toBe("todo");
  });

  it("returns 400 for malformed JSON", async () => {
    const response = await POST(jsonRequest("{not json"));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error.code).toBe("INVALID_JSON");
  });

  it("returns 422 with field errors for invalid data", async () => {
    const response = await POST(jsonRequest({ title: "a", dueDate: "nope" }));
    const json = await response.json();

    expect(response.status).toBe(422);
    expect(json.error.code).toBe("VALIDATION_ERROR");
    const fields = json.error.details.map((d: { field: string }) => d.field);
    expect(fields).toContain("title");
    expect(fields).toContain("dueDate");
  });
});

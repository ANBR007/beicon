import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

function makeRequest(body: Record<string, string>, ip = "203.0.113.1") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Ana Souza",
  company: "Ana Studio",
  email: "ana@example.com",
  whatsapp: "11999998888",
  objective: "Criar/reformular minha marca",
  website: "",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_DESTINATION_EMAIL = "contato@beiconmkt.com.br";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "email_123" }), { status: 200 }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_DESTINATION_EMAIL;
  });

  it("accepts a valid submission and calls Resend", async () => {
    const res = await POST(makeRequest(validPayload, "203.0.113.10"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("returns 500 when email isn't configured", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(makeRequest(validPayload, "203.0.113.14"));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("returns 502 when Resend fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("bad request", { status: 422 }))
    );
    const res = await POST(makeRequest(validPayload, "203.0.113.15"));
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("rejects when the honeypot field is filled", async () => {
    const res = await POST(makeRequest({ ...validPayload, website: "spam" }, "203.0.113.11"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("rejects an invalid email", async () => {
    const res = await POST(makeRequest({ ...validPayload, email: "not-an-email" }, "203.0.113.12"));
    expect(res.status).toBe(400);
  });

  it("rejects a missing required field", async () => {
    const res = await POST(makeRequest({ ...validPayload, name: "" }, "203.0.113.13"));
    expect(res.status).toBe(400);
  });

  it("rate-limits repeated submissions from the same IP", async () => {
    const ip = "203.0.113.20";
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(validPayload, ip));
    }
    const res = await POST(makeRequest(validPayload, ip));
    expect(res.status).toBe(429);
  });
});

import { checkRateLimit } from "@/lib/rateLimit";

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  objective: string;
  website: string; // honeypot — must stay empty
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request): Promise<Response> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return json(429, { ok: false, error: "Muitas tentativas. Tente novamente em instantes." });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, error: "Requisição inválida." });
  }

  if (payload.website) {
    return json(400, { ok: false, error: "Requisição inválida." });
  }

  if (!payload.name?.trim() || !payload.company?.trim() || !payload.whatsapp?.trim() || !payload.objective?.trim()) {
    return json(400, { ok: false, error: "Preencha todos os campos obrigatórios." });
  }

  if (!isValidEmail(payload.email ?? "")) {
    return json(400, { ok: false, error: "Informe um e-mail válido." });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const destinationEmail = process.env.CONTACT_DESTINATION_EMAIL;

  if (!resendApiKey || !destinationEmail) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_DESTINATION_EMAIL not configured.");
    return json(500, { ok: false, error: "Formulário temporariamente indisponível. Fale com a gente pelo WhatsApp." });
  }

  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Beicon Mkt <onboarding@resend.dev>",
      to: destinationEmail,
      reply_to: payload.email,
      subject: `Novo diagnóstico solicitado — ${payload.company}`,
      text: `Nome: ${payload.name}\nEmpresa: ${payload.company}\nE-mail: ${payload.email}\nWhatsApp: ${payload.whatsapp}\nObjetivo: ${payload.objective}`,
    }),
  });

  if (!emailRes.ok) {
    const errorBody = await emailRes.text();
    console.error("Contact form: Resend API error", emailRes.status, errorBody);
    return json(502, { ok: false, error: "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp." });
  }

  return json(200, { ok: true });
}

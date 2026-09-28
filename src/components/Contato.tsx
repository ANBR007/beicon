"use client";

import { useState } from "react";
import { contato } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

// Estados possíveis do formulário, usados para trocar o texto do botão/mensagem de resultado
type Status = "idle" | "submitting" | "success" | "error";

// Seção "Contato" — formulário que envia os dados para a rota /api/contact (envio de e-mail).
export function Contato() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Chamado ao enviar o formulário: monta o payload, chama a API e mostra sucesso/erro na tela
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Guarda uma referência ao <form> ANTES do await — depois do await o React já pode ter
    // desmontado/recriado o evento, então `event.currentTarget` não seria mais confiável.
    const formEl = event.currentTarget;
    setStatus("submitting");
    const form = new FormData(formEl);
    const payload = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      whatsapp: String(form.get("whatsapp") ?? ""),
      objective: String(form.get("objective") ?? ""),
      // Campo "website" é um honeypot (input escondido) — só bots preenchem, gente não vê ele
      website: String(form.get("website") ?? ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();

    if (json.ok) {
      setStatus("success");
      formEl.reset();
    } else {
      setStatus("error");
      setErrorMessage(json.error ?? "Não foi possível enviar. Tente novamente.");
    }
  }

  return (
    <section id="contato" className="container-grid py-24 md:py-32 border-t border-line">
      <Reveal>
        <div className="grid grid-cols-12 gap-6">
          {/* Rótulo pequeno à esquerda ("/CONTATO") */}
          <div className="col-span-12 md:col-span-2">
            <SectionLabel>{contato.label}</SectionLabel>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <h2 className="text-display font-light leading-[0.94] tracking-[-0.035em] max-w-[16ch]">
              {contato.title}
            </h2>
            <p className="text-lead font-light leading-[1.45] mt-6 max-w-[62ch]">{contato.lead}</p>

            {/* Formulário: 2 colunas no desktop, 1 no mobile */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12" noValidate>
              {/* Honeypot anti-spam: invisível para pessoas, bots costumam preencher todo campo que acham */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-label uppercase tracking-[0.14em]">Nome completo</label>
                <input id="name" name="name" required className="border-b border-line py-2 bg-transparent focus:outline-none focus:border-2 focus:border-ink" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-label uppercase tracking-[0.14em]">Nome da empresa/marca</label>
                <input id="company" name="company" required className="border-b border-line py-2 bg-transparent focus:outline-none focus:border-2 focus:border-ink" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-label uppercase tracking-[0.14em]">E-mail corporativo</label>
                <input id="email" name="email" type="email" required className="border-b border-line py-2 bg-transparent focus:outline-none focus:border-2 focus:border-ink" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="whatsapp" className="text-label uppercase tracking-[0.14em]">WhatsApp</label>
                <input id="whatsapp" name="whatsapp" required className="border-b border-line py-2 bg-transparent focus:outline-none focus:border-2 focus:border-ink" />
              </div>

              {/* Combo de objetivo — as opções vêm de contato.objectives (content.ts) */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="objective" className="text-label uppercase tracking-[0.14em]">Qual o seu principal objetivo hoje?</label>
                <select id="objective" name="objective" required defaultValue="" className="border-b border-line py-2 bg-transparent focus:outline-none focus:border-2 focus:border-ink">
                  <option value="" disabled>Selecione uma opção</option>
                  {contato.objectives.map((objective) => (
                    <option key={objective} value={objective}>{objective}</option>
                  ))}
                </select>
              </div>

              {/* Botão de envio (fundo com o degradê da marca) + mensagem de sucesso/erro ao lado */}
              <div className="md:col-span-2 flex items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-6 py-3 text-label uppercase tracking-[0.14em] text-on-dark disabled:opacity-60"
                  style={{ background: "var(--gradient)" }}
                >
                  {status === "submitting" ? "Enviando..." : contato.submitLabel}
                </button>
                {/* aria-live: leitores de tela anunciam a mensagem assim que ela aparece */}
                <div aria-live="polite" className="text-body">
                  {status === "success" && "Recebido — entraremos em contato em breve."}
                  {status === "error" && errorMessage}
                </div>
              </div>
            </form>

            {/* Contatos diretos, abaixo do formulário (WhatsApp / e-mail / Instagram) */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8 mt-12 text-body">
              <a href={contato.whatsapp.href} className="underline underline-offset-4">{contato.whatsapp.label}</a>
              <a href={`mailto:${contato.email}`} className="underline underline-offset-4">{contato.email}</a>
              <a href={contato.instagram.href} className="underline underline-offset-4">{contato.instagram.label}</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const formData = await request.formData();
        const nome = String(formData.get("nome") ?? "").trim();
        const whatsapp = String(formData.get("whatsapp") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const perfil = String(formData.get("perfil") ?? "").trim();
        const interessesRaw = String(formData.get("interesses") ?? "").trim();
        const empresa = String(formData.get("empresa") ?? "").trim();
        const sobre = String(formData.get("sobre") ?? "").trim();

        if (!nome || nome.length > 100) {
          return new Response("Informe seu nome completo.", { status: 400 });
        }
        if (whatsapp.replace(/\D/g, "").length < 10) {
          return new Response("Informe um WhatsApp válido.", { status: 400 });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
          return new Response("Informe um e-mail válido.", { status: 400 });
        }
        if (!perfil) {
          return new Response("Selecione o seu perfil.", { status: 400 });
        }

        const interesses = interessesRaw
          ? interessesRaw.split(",").map((s) => s.trim())
          : [];

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.from("leads").insert({
          nome,
          whatsapp,
          email,
          perfil,
          interesses,
          empresa: empresa || null,
          sobre: sobre || null,
        });

        if (error) {
          console.error("Erro ao salvar lead:", error);
          return new Response("Não foi possível salvar seu cadastro. Tente novamente.", { status: 500 });
        }

        throw redirect({ to: "/obrigado" });
      },
    },
  },
});

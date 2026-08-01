import { createServerFn } from "@tanstack/react-start";

export type LeadInput = {
  nome: string;
  whatsapp: string;
  email: string;
  perfil: string;
  interesses: string[];
  empresa: string | undefined;
  sobre: string | undefined;
};

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: LeadInput) => data)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("leads").insert({
      nome: data.nome,
      whatsapp: data.whatsapp,
      email: data.email,
      perfil: data.perfil,
      interesses: data.interesses,
      empresa: data.empresa ?? null,
      sobre: data.sobre ?? null,
    });

    if (error) {
      console.error("Erro ao salvar lead:", error);
      throw new Error("Não foi possível salvar seu cadastro. Tente novamente.");
    }

    return { ok: true };
  });

export const listLeads = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao listar leads:", error);
    throw new Error("Não foi possível carregar os cadastros.");
  }

  return data ?? [];
});

import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listLeads } from "@/lib/leads.functions";
import logoAsset from "@/assets/able-logo-f.png.asset.json";

const leadsQueryOptions = queryOptions({
  queryKey: ["leads"],
  queryFn: () => listLeads(),
});

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "ABLE — Cadastros" },
      {
        name: "description",
        content: "Lista de cadastros recebidos no formulário da ABLE.",
      },
      { property: "og:title", content: "ABLE — Cadastros" },
      {
        property: "og:description",
        content: "Lista de cadastros recebidos no formulário da ABLE.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(leadsQueryOptions),
  component: LeadsPage,
});

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return value;
}

function formatDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month:"2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function LeadsPage() {
  const { data: leads } = useSuspenseQuery(leadsQueryOptions);

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <img
            src={logoAsset.url}
            alt="ABLE — Ambitious, Builders, Leaders, Ecosystem"
            className="mx-auto h-14 w-auto object-contain mix-blend-screen"
          />
          <h1 className="mt-8 font-display text-3xl font-light tracking-tight text-foreground">
            Cadastros recebidos
          </h1>
          <p className="mt-2 text-sm font-light text-muted-foreground">
            {leads.length} {leads.length === 1 ? "pessoa cadastrada" : "pessoas cadastradas"}
          </p>
        </header>

        {leads.length === 0 ? (
          <div className="rounded-2xl border border-border bg-graphite/40 px-6 py-16 text-center">
            <p className="text-sm font-light text-muted-foreground">
              Nenhum cadastro recebido ainda.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <article
                key={lead.id}
                className="rounded-2xl border border-border bg-graphite/40 p-6 transition-colors hover:border-champagne/30"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-display text-lg font-medium text-foreground">
                      {lead.nome}
                    </h2>
                    <p className="mt-1 text-sm font-light text-champagne">
                      {lead.perfil}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-light text-muted-foreground">
                      <span>{lead.email}</span>
                      <span>{formatPhone(lead.whatsapp)}</span>
                    </div>
                    {lead.empresa ? (
                      <p className="mt-1 text-sm font-light text-muted-foreground">
                        {lead.empresa}
                      </p>
                    ) : null}
                    {lead.sobre ? (
                      <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-foreground/80">
                        {lead.sobre}
                      </p>
                    ) : null}
                    {lead.interesses && lead.interesses.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {lead.interesses.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-champagne/30 px-3 py-1 text-xs font-light text-champagne"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <time className="shrink-0 text-xs font-light text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </time>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

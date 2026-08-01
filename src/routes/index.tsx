import { createFileRoute } from "@tanstack/react-router";
import { AbleForm } from "@/components/AbleForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABLE — Cadastro no ecossistema" },
      {
        name: "description",
        content:
          "Cadastre-se na ABLE: ecossistema de empreendedores, executivos e investidores. Networking, conteúdo, eventos e parcerias.",
      },
      { property: "og:title", content: "ABLE — Cadastro no ecossistema" },
      {
        property: "og:description",
        content:
          "Cadastre-se na ABLE: networking, conteúdo, eventos e novas oportunidades.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-lg px-6 pt-28 pb-20 text-center">
        <p className="text-[0.7rem] font-light uppercase tracking-[0.3em] text-champagne-dim">
          Ambitious · Builders · Leaders · Ecosystem
        </p>
        <h1 className="mt-8 font-display text-4xl font-light leading-[1.15] tracking-tight text-foreground">
          Um ecossistema de
          <br />
          quem constrói.
        </h1>
      </section>
      <AbleForm />
    </main>
  );
}

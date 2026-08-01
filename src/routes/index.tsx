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
      <section className="mx-auto max-w-xl px-6 pt-24 pb-4">
        <h1 className="font-display text-4xl font-light tracking-tight text-foreground">
          Ambitious. Builders. Leaders. Ecosystem.
        </h1>
        <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
          Um ecossistema de pessoas que constroem. Deixe seus dados no formulário
          abaixo para entrar em contato com a ABLE.
        </p>
      </section>
      <AbleForm />
    </main>
  );
}

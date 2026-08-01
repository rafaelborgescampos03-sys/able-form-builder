import { createFileRoute } from "@tanstack/react-router";
import { AbleForm } from "@/components/AbleForm";
import { ClientOnly } from "@/components/ClientOnly";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABLE — Entre no radar" },
      {
        name: "description",
        content:
          "Cadastre-se na ABLE: ecossistema de empreendedores, executivos e investidores. Networking, conteúdo, eventos e parcerias.",
      },
      { property: "og:title", content: "ABLE — Entre no radar" },
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
      <ClientOnly>
        <AbleForm />
      </ClientOnly>
    </main>
  );
}

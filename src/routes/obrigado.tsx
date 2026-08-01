import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import logoAsset from "@/assets/able-logo-f.png.asset.json";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "ABLE — Cadastro recebido" },
      {
        name: "description",
        content:
          "Recebemos seu cadastro na ABLE. Em breve entraremos em contato pelo WhatsApp.",
      },
      { property: "og:title", content: "ABLE — Cadastro recebido" },
      {
        property: "og:description",
        content:
          "Recebemos seu cadastro na ABLE. Em breve entraremos em contato pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Obrigado,
});

function Obrigado() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <section className="mx-auto max-w-md text-center">
        <img
          src={logoAsset.url}
          alt="ABLE — Ambitious, Builders, Leaders, Ecosystem"
          className="mx-auto h-14 w-auto object-contain mix-blend-screen"
        />
        <div className="mx-auto mt-10 flex h-14 w-14 items-center justify-center rounded-full border border-champagne/40">
          <Check className="h-5 w-5 text-champagne" strokeWidth={1.25} />
        </div>
        <h1 className="mt-8 font-display text-3xl font-light tracking-tight text-foreground">
          Recebemos seu cadastro
        </h1>
        <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
          Em breve entramos em contato pelo WhatsApp.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-champagne/50 hover:text-champagne"
          >
            Voltar
          </Link>
        </div>
      </section>
    </main>
  );
}

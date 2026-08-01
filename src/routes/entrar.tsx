import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { adminLogin } from "@/lib/admin.functions";
import logoAsset from "@/assets/able-logo-f.png.asset.json";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "ABLE — Acesso restrito" },
      { name: "description", content: "Área restrita da ABLE para visualizar os cadastros." },
      { property: "og:title", content: "ABLE — Acesso restrito" },
      {
        property: "og:description",
        content: "Área restrita da ABLE para visualizar os cadastros.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EntrarPage,
});

function EntrarPage() {
  const router = useRouter();
  const login = useServerFn(adminLogin);
  const [erro, setErro] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setEnviando(true);
    setErro(false);
    try {
      const { ok } = await login({
        data: {
          usuario: String(form.get("usuario") ?? ""),
          senha: String(form.get("senha") ?? ""),
        },
      });
      if (ok) await router.navigate({ to: "/leads" });
      else setErro(true);
    } catch {
      setErro(true);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm">
        <img
          src={logoAsset.url}
          alt="ABLE"
          className="mx-auto h-12 w-auto object-contain mix-blend-screen"
        />
        <h1 className="mt-10 text-center font-display text-2xl font-light tracking-tight text-foreground">
          Acesso restrito
        </h1>

        <form onSubmit={onSubmit} className="mt-10 space-y-5">
          <div className="space-y-2">
            <label htmlFor="usuario" className="block text-base font-medium text-foreground">
              Usuário
            </label>
            <input
              id="usuario"
              name="usuario"
              autoComplete="username"
              required
              className="w-full rounded-xl border border-border bg-graphite/60 px-4 py-3 text-base font-light text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-champagne/50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="senha" className="block text-base font-medium text-foreground">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-border bg-graphite/60 px-4 py-3 text-base font-light text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-champagne/50"
            />
          </div>

          {erro ? (
            <p className="text-sm font-light text-champagne">Usuário ou senha incorretos.</p>
          ) : null}

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-xl bg-champagne px-6 py-3 text-base font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {enviando ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}

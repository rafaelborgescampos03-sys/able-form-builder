import { useState } from "react";
import { toast } from "sonner";
import logoAsset from "@/assets/able-logo-f.png.asset.json";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PERFIS = ["Empreendedor", "Executivo", "Estudante", "Investidor", "Outro"];
const INTERESSES = [
  "Networking",
  "Conteúdo",
  "Eventos",
  "Novas oportunidades",
  "Parcerias",
];

export function AbleForm() {
  const [perfil, setPerfil] = useState("");
  const [interesses, setInteresses] = useState<string[]>([]);

  const toggleInteresse = (item: string) =>
    setInteresses((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!nome || nome.length > 100) return toast.error("Informe seu nome completo.");
    if (whatsapp.replace(/\D/g, "").length < 10)
      return toast.error("Informe um WhatsApp válido.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      return toast.error("Informe um e-mail válido.");
    if (!perfil) return toast.error("Selecione o seu perfil.");

    toast.success("Cadastro enviado. Em breve entraremos em contato.");
    e.currentTarget.reset();
    setPerfil("");
    setInteresses([]);
  };

  return (
    <section className="border-y border-border bg-background py-20">
      <div className="mx-auto w-full max-w-xl px-6">
        <img
          src={logoAsset.url}
          alt="ABLE — Ambitious, Builders, Leaders, Ecosystem"
          className="h-10 w-auto object-contain"
        />

        <h2 className="mt-10 font-display text-3xl font-light tracking-tight text-foreground">
          Faça parte da ABLE
        </h2>
        <p className="mt-2 text-sm font-light text-muted-foreground">
          Preencha os campos abaixo. Leva menos de um minuto.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Nome completo*
              </Label>
              <Input id="nome" name="nome" maxLength={100} autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                WhatsApp*
              </Label>
              <Input id="whatsapp" name="whatsapp" inputMode="tel" maxLength={20} placeholder="(00) 00000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                E-mail*
              </Label>
              <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" />
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Você é
            </legend>
            <div className="flex flex-wrap gap-2">
              {PERFIS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPerfil(item)}
                  aria-pressed={perfil === item}
                  className={`border px-4 py-2 text-sm font-light transition-colors ${
                    perfil === item
                      ? "border-champagne text-champagne"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="empresa" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Nome da empresa (opcional)
            </Label>
            <Input id="empresa" name="empresa" maxLength={120} />
          </div>

          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              O que você busca na ABLE?
            </legend>
            <div className="flex flex-wrap gap-2">
              {INTERESSES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInteresse(item)}
                  aria-pressed={interesses.includes(item)}
                  className={`border px-4 py-2 text-sm font-light transition-colors ${
                    interesses.includes(item)
                      ? "border-champagne text-champagne"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="sobre" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Sobre você
            </Label>
            <Textarea id="sobre" name="sobre" rows={4} maxLength={1000} />
          </div>

          <Button type="submit" className="w-full rounded-none py-6 text-xs uppercase tracking-[0.2em]">
            Enviar cadastro
          </Button>
        </form>
      </div>
    </section>
  );
}

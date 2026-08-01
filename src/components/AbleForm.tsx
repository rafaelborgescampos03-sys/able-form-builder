import { useState } from "react";
import { toast } from "sonner";
import {
  Check,
  User,
  Phone,
  Mail,
  Building2,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import logoAsset from "@/assets/able-logo-f.png.asset.json";

const PERFIS = ["Empreendedor", "Executivo", "Estudante", "Investidor", "Outro"];
const INTERESSES = [
  "Networking",
  "Conteúdo",
  "Eventos",
  "Novas oportunidades",
  "Parcerias",
];

function Field({
  label,
  icon: Icon,
  hint,
  children,
}: {
  label: string;
  icon: LucideIcon;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="mb-3 flex items-center gap-2 text-base font-medium text-foreground">
        <Icon className="h-4 w-4 text-champagne" strokeWidth={1.5} />
        {label}
        {hint ? (
          <span className="text-xs font-light text-muted-foreground">{hint}</span>
        ) : null}
      </span>
      <div className="rounded-2xl border border-border bg-graphite/70 px-4 py-1 transition-colors group-focus-within:border-champagne/50">
        {children}
      </div>
    </label>
  );
}

const inputClass =
  "w-full border-0 bg-transparent py-3 text-base font-light text-foreground outline-none placeholder:font-light placeholder:text-muted-foreground";

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-light transition-all duration-300 ${
        active
          ? "border-champagne/60 bg-champagne/10 text-champagne"
          : "border-border text-muted-foreground hover:border-champagne-dim/50 hover:text-foreground"
      }`}
    >
      <Check
        className={`h-3 w-3 transition-all duration-300 ${
          active ? "opacity-100" : "-ml-5 w-0 opacity-0"
        }`}
        strokeWidth={1.5}
      />
      {label}
    </button>
  );
}

export function AbleForm() {
  const [perfil, setPerfil] = useState("");
  const [interesses, setInteresses] = useState<string[]>([]);
  const [enviado, setEnviado] = useState(false);

  const toggleInteresse = (item: string) =>
    setInteresses((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!nome || nome.length > 100) {
      toast.error("Informe seu nome completo.");
      return;
    }
    if (whatsapp.replace(/\D/g, "").length < 10) {
      toast.error("Informe um WhatsApp válido.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      toast.error("Informe um e-mail válido.");
      return;
    }
    if (!perfil) {
      toast.error("Selecione o seu perfil.");
      return;
    }

    form.reset();
    setPerfil("");
    setInteresses([]);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <section className="relative overflow-hidden border-t border-border bg-background px-6 py-32">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-champagne/40">
            <Check className="h-5 w-5 text-champagne" strokeWidth={1.25} />
          </div>
          <h2 className="mt-8 font-display text-3xl font-light tracking-tight text-foreground">
            Recebemos seu cadastro
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
            Em breve entramos em contato pelo WhatsApp.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-t border-border bg-background px-6 py-24">
      {/* halo champanhe sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "var(--champagne)" }}
      />

      <div className="relative mx-auto w-full max-w-lg">
        <header className="text-center">
          <img
            src={logoAsset.url}
            alt="ABLE — Ambitious, Builders, Leaders, Ecosystem"
            className="mx-auto h-14 w-auto object-contain mix-blend-screen"
          />
          <div className="mx-auto mt-8 h-px w-10 bg-champagne/40" />
          <h2 className="mt-8 font-display text-[2rem] font-light leading-tight tracking-tight text-foreground">
            Entre no radar da ABLE
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="mt-16 space-y-14">
          <div className="space-y-10">
            <Field label="Nome completo" icon={User}>
              <input
                name="nome"
                maxLength={100}
                autoComplete="name"
                placeholder="Como podemos te chamar"
                className={inputClass}
              />
            </Field>
            <Field label="WhatsApp" icon={Phone}>
              <input
                name="whatsapp"
                inputMode="tel"
                maxLength={20}
                placeholder="(00) 00000-0000"
                className={inputClass}
              />
            </Field>
            <Field label="E-mail" icon={Mail}>
              <input
                name="email"
                type="email"
                maxLength={255}
                autoComplete="email"
                placeholder="seu@email.com"
                className={inputClass}
              />
            </Field>
          </div>

          <fieldset className="space-y-5">
            <legend className="text-sm font-normal text-foreground">
              Você é
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {PERFIS.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  active={perfil === item}
                  onClick={() => setPerfil(item)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="text-sm font-normal text-foreground">
              O que você busca na ABLE
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {INTERESSES.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  active={interesses.includes(item)}
                  onClick={() => toggleInteresse(item)}
                />
              ))}
            </div>
          </fieldset>

          <div className="space-y-10">
            <Field label="Empresa" icon={Building2} hint="opcional">
              <input
                name="empresa"
                maxLength={120}
                placeholder="Nome da empresa"
                className={inputClass}
              />
            </Field>
            <Field label="Sobre você" icon={MessageSquare} hint="opcional">
              <textarea
                name="sobre"
                rows={3}
                maxLength={1000}
                placeholder="Conte em poucas linhas"
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>

          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-full bg-champagne px-8 py-4 text-[0.7rem] uppercase tracking-[0.28em] text-background transition-opacity hover:opacity-90"
          >
            Enviar cadastro
          </button>
        </form>
      </div>
    </section>
  );
}

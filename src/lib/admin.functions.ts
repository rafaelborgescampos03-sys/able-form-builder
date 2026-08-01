import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";

type AdminSession = { unlocked?: boolean };

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "able-admin",
    maxAge: 60 * 60 * 24 * 30,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

function matches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function requireAdmin() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.unlocked) throw redirect({ to: "/entrar" });
  return session;
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { usuario: string; senha: string }) => data)
  .handler(async ({ data }) => {
    const user = process.env["ADMIN_USER"];
    const pass = process.env["ADMIN_PASSWORD"];
    if (!user || !pass) throw new Error("Acesso não configurado.");

    if (!matches(data.usuario.trim(), user) || !matches(data.senha, pass)) {
      return { ok: false as const };
    }

    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

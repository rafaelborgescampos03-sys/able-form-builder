import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { usuario: string; senha: string }) => data)
  .handler(async ({ data }) => {
    const { sessionConfig, matches } = await import("./admin.server");
    const user = process.env["ADMIN_USER"];
    const pass = process.env["ADMIN_PASSWORD"];
    if (!user || !pass) throw new Error("Acesso não configurado.");

    if (!matches(data.usuario.trim(), user) || !matches(data.senha, pass)) {
      return { ok: false as const };
    }

    const session = await useSession<{ unlocked?: boolean }>(sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { sessionConfig } = await import("./admin.server");
  const session = await useSession<{ unlocked?: boolean }>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

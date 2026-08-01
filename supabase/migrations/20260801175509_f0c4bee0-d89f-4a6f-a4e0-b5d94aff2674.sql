CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  whatsapp text NOT NULL,
  email text NOT NULL,
  perfil text,
  interesses text[] DEFAULT '{}',
  empresa text,
  sobre text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage leads"
ON public.leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
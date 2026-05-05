# Ivy Admit - AI College Essay Review

Production AI web app that scores college admissions essays against a 100-point rubric, generates line-by-line edits, and ships a suite of 20 specialized writing tools. Built solo, end-to-end.

**Live:** [getivyadmit.com](https://getivyadmit.com)

---

## What it does

Students paste an essay and get, in under 60 seconds:

- **A scored rubric** - 100 points split across content, structure, voice, school fit, and grammar, calibrated to admissions-officer standards.
- **Line-by-line rewrites** - concrete suggestions tied to actual quotes from the draft, with reasoning.
- **An admissions-officer view** - first-impression verdict, strengths, concerns, and per-school fit notes when target schools are provided.
- **A 20-tool toolbox** - hook generator, prompt deconstructor, cliché detector, "Why This College" brainstormer, AO simulator, activity rewriter, polish pass, and more. Each one is a focused, single-purpose AI utility with its own page, prompt, and SEO surface.

The full authenticated editor adds version history, multi-essay management, streaming rewrites, and a school-fit panel. Free public scorer sits at `/try`; the editor lives behind Supabase auth at `/editor`.

---

## Tech stack

| Layer | Tools |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript 5 |
| Styling | Tailwind CSS 4 · Radix UI primitives · shadcn-style component library · Motion |
| AI | OpenAI SDK (structured outputs + streaming) |
| Data & auth | Supabase (Postgres + Row-Level Security + SSR auth) |
| Payments | Stripe Checkout + subscription webhooks |
| Hosting | Vercel · Vercel Analytics |
| Forms / UX | react-hook-form · sonner · cmdk · embla · recharts |

---

## Architecture highlights

- **App Router with route-level metadata + JSON-LD.** Every page ships its own `Metadata` export plus structured data (FAQPage, Organization, SoftwareApplication, WebSite) for rich results.
- **20 AI tools as data, not code.** Each tool is a record in `src/tools/tools.ts` with a slug, prompt, and output style (`streaming` or `structured`). One dynamic route at `app/tools/[slug]` renders all of them; one API handler per tool keeps server logic isolated.
- **Two output modes per tool.** Long-form generation streams token-by-token with the OpenAI streaming API; analytical tools return a typed JSON schema validated server-side.
- **Auth-gated editor via Next proxy.** `proxy.ts` checks Supabase sessions only for `/editor/**`, leaving the public marketing site, free scorer, and tools fully cacheable.
- **Rate limiting + abuse control** in `src/lib/rate-limit.ts` backed by a Supabase table, scoped per tool per IP.
- **Stripe billing loop.** Checkout session creation in `app/api/create-checkout`, subscription state synced into `subscriptions` and `tool_rate_limits` tables.
- **SEO-first content engine.** A static blog (`src/blog`) with MDX-style posts, programmatic sitemap (`app/sitemap.ts`), robots, and a manifest, all generated from typed data.

---

## Project layout

```
app/                  Next.js routes - landing, /try, /editor, /tools/[slug], /blog, /api/*
  api/                20 tool endpoints + rate-essay, rewrite-essay, chat, Stripe checkout, Supabase tokens
src/
  Landing/            Marketing site, hero, FAQ, social proof
  PublicScorer/       Free single-page scorer at /try
  Editor/             Authenticated multi-essay editor (panels, version history, school-fit, AO view)
  tools/              Tool registry, prompts, schools data, rewriters, FAQ variants
  blog/               Posts + content
  lib/                Supabase clients (server / browser / proxy) + rate limiting
  design/             Shared UI primitives
proxy.ts              Auth gate for /editor
supabase-*.sql        Schema, essays, subscriptions, rate limits
```

---

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in OpenAI, Supabase, Stripe keys
npm run dev
```

Required env vars: `OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`.

Apply schema with the `supabase-*.sql` files (essays, subscriptions, rate limits). See `SUPABASE_SETUP.md` and `SETUP_INSTRUCTIONS.md` for full instructions.

```bash
npm run dev      # local dev
npm run build    # production build
npm run lint     # eslint
```

---

## Engineering choices worth calling out

- **Prompt rigor over model size.** The rate-essay prompt is a multi-section rubric with explicit point bands and calibration ("most essays should score 60–85") - chosen over a vaguer prompt to keep scoring consistent across drafts.
- **Streaming where it matters.** Tools that produce prose stream so users see output immediately; analytical tools return one structured JSON payload so the UI can render real components instead of parsed text.
- **Public surface as growth engine.** Each tool is its own indexable page with unique metadata, FAQ schema, and persona-specific copy - programmatic SEO on a typed registry rather than hand-rolled pages.
- **Tight free → paid ladder.** Free scorer captures intent; the editor and high-volume tools sit behind subscription gates enforced server-side via Supabase + Stripe.

---

## Contact

Built and maintained by Toby Thurston. Live product: [getivyadmit.com](https://getivyadmit.com).

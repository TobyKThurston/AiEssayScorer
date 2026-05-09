# SEO Strategic Plan — getivyadmit.com

**Prepared:** 2026-05-09
**Site age:** ~13 months
**Industry:** SaaS + programmatic-content hybrid (admissions tools)
**Owner:** Toby Thurston

---

## 1. Current state diagnosis (evidence-based)

| Signal | Value | Verdict |
|---|---|---|
| URLs in sitemap | 910 | Aggressive footprint |
| Indexed (GSC sitemap report, 2026-05-09) | 0 | Indexation is broken |
| Indexed (memory baseline 2026-05-04) | 35 | Pre-expansion baseline |
| 30-day impressions | ~92 (mostly brand + `www` legacy) | Effectively pre-launch |
| Quick wins (pos 4–10, low CTR) | 0 | No pages near the click zone |
| Best non-brand query | "ivy league essays" → pos 73 | No ranking foothold yet |
| GEO readiness | 62 / 100 | Above average; authority gap is the lid |
| Foundation work (last 7 days) | Schema, headers, sitemap tiering, page-strengthening, 264 new pages | Largely complete |

**Inventory:** 84 rich schools + 150 extra colleges, 240 X-vs-Y matchups, 66 blog posts, 24 tools, 27 state pages, ~280 programmatic tool variants (hook-X, score-X-essay, etc.), 11 hand-written editorial landings.

**Single binding constraint:** indexation, not page count. Adding more programmatic pages compounds the problem; getting Google to crawl + index what already exists unlocks all downstream work.

## 2. Competitor landscape

| Competitor | Type | Moat |
|---|---|---|
| CollegeEssayGuy.com | Editorial publisher + course | DA 60+, decade of content, named author Ethan Sawyer |
| PrepScholar (blog) | SaaS + content factory | DA 80+, thousands of articles, brand recognition |
| Niche.com | Data-driven directory | DA 90+, school review UGC moat |
| AdmitYogi | AI essay tool (close peer) | New, raising authority via Reddit/TikTok |
| EssayMaster | Essay editing | Counselor authorship, alumni endorsements |
| CollegeVine | AI + community | DA 70+, free Chancing tool, $50M raised |
| r/ApplyingToCollege | Reddit (channel, not competitor) | Owns long-tail "Reddit + essay" queries |

**Implication:** can't out-publish PrepScholar; win on **specificity** (per-school tools, structured data outputs) and **conversion** (free /try → editor). Reddit + Wikipedia gaps from the GEO audit are the AI-citation lid.

## 3. Strategic pillars (12 months)

### Pillar A — Indexation rescue (Months 1–2, critical)
- Daily IndexNow pings for new/updated URLs
- Manual URL Inspection + "Request indexing" for top 50 tier-1/2 URLs (homepage, /try, /tools, /colleges, 11 editorial landings, top 20 colleges, top 10 X-vs-Y)
- Ship `/llms.txt` (already drafted in `GEO-ANALYSIS.md` lines 54–78)
- Internal-link audit: every programmatic page must be reachable in ≤3 clicks from homepage. The 240 X-vs-Y pages and 27 state pages are likely orphans — add them to /colleges hub
- **Stop adding new programmatic page types until index rate >60%**
- Success metric: 400+ indexed URLs by 2026-07-09

### Pillar B — Authority bootstrap (Months 2–6)
Brand at pos 17 = effectively zero authority.
- Founder presence: Twitter/LinkedIn + r/ApplyingToCollege (real account, not promotional)
- Original data publishing: quarterly "Common App essay trends" reports with anonymized scoring data — moat competitors can't copy
- Counselor partnerships: 5–10 IECA/HECA counselors quoted on landing pages → links + E-E-A-T
- HARO / Help A B2B Writer / Qwoted: 2 pitches/week as "AI college essay tool founder"
- Reddit AMA in r/ApplyingToCollege (gated by mod approval — earn it with months of helpful comments first)
- Success metric: 30+ referring domains by 2026-11-09

### Pillar C — E-E-A-T injection (Months 3–6)
GEO audit flagged "Author = Organization only" as the #1 lid.
- Named author bios with credentials on every blog post + editorial landing
- "Reviewed by [admissions counselor]" on every school page
- `sameAs` expansion: LinkedIn, Crunchbase, Product Hunt, AngelList beyond Twitter
- 5–10 testimonials → Person schema reviews (with permission)
- Machine-readable "Last reviewed" + "Reviewed by" date stamps in JSON-LD

### Pillar D — Conversion engine on landings (Months 4–8)
910 pages with 0 clicks isn't only an indexation problem — when traffic arrives, the funnel must convert.

| Page type | Primary CTA |
|---|---|
| `/colleges/[school]` | "Score your essay against [school]'s admission bar →" `/try?school=X` |
| `/colleges/compare/X-vs-Y` | "Get your odds at both →" `/odds` |
| `/tools/why-[school]-essay` | "Generate your draft →" + sticky "Score it" CTA |
| Blog posts | Inline tool embeds (NerdWallet-style calculator inlining) |
| Editorial landings | Email capture for free essay-prompt PDF |

Track: organic landing → /try conversion (target 8%+), /try → editor signup (target 3%+).

### Pillar E — Seasonal compounding (Months 7–12)
US admissions calendar: Common App opens Aug 1, ED deadlines Nov 1, RD Jan 1.
- Aug–Nov 2026 is the make-or-break window: press cycle (TechCrunch, Forbes, EdTech Magazine), counselor email blast, paid amplification of best-converting landings
- Add a "live" element each cycle (decision-day prompt analyzer, acceptance-week scoring) to capture seasonal news cycles

## 4. KPI targets

| Metric | Now (2026-05-09) | 3-mo (Aug) | 6-mo (Nov) | 12-mo (May 2027) |
|---|---|---|---|---|
| Indexed pages | 0–35 | 400 | 700 | 850 |
| Organic clicks/mo | ~0 | 200 | 2,500 | 15,000 |
| Top-3 ranking keywords | 0 | 5 | 30 | 150 |
| Referring domains | <5 | 15 | 40 | 100 |
| Brand search volume | ~5/mo | 30/mo | 200/mo | 1,500/mo |
| /try → editor signup | TBD | 3% | 5% | 7% |
| GEO readiness | 62 | 75 | 85 | 90 |

## 5. Execution roadmap

**Phase 1 — Foundation (weeks -8 to 0):** ✅ Done. Schema, headers, sitemap priorities, page strengthening, 264 SEO pages added, GEO audit complete.

**Phase 2 — Indexation rescue (weeks 1–8):**
- Week 1: Ship `/llms.txt`, manual GSC indexing requests for top 50, IndexNow integration
- Week 2: Internal-link sweep — orphaned matchups + state pages get hub linking
- Week 3: Add `Person` schema authorship + counselor reviewer on school pages
- Week 4: First original data report ("How 1000 essays scored — patterns we found")
- Weeks 5–8: Daily indexation monitoring; escalate pages stuck at "Discovered, not indexed"

**Phase 3 — Authority + conversion (weeks 9–24):**
- Months 3–4: Counselor outreach (5 partnerships), HARO cadence, founder content
- Months 4–5: Per-page-type CTA optimization, email capture on editorial landings
- Months 5–6: Reddit/Twitter community building, second data report, first guest post

**Phase 4 — Seasonal compounding (weeks 25–52):**
- Months 7–9 (Aug–Oct 2026): Press cycle, paid amplification, school counselor email blast at peak
- Months 10–12: Optimize what's working; prune programmatic pages still at 0 impressions after 6 months (noindex); plan year-2 expansion

## 6. Things to NOT do

- Don't add more programmatic page types until current ones index. Already at quality-gate WARNING with 234 college pages.
- Don't chase "ivy league essays" head term yet — authority needed first. Target long-tail school-specific queries that match structured data.
- Don't use FAQ schema on commercial pages for Google rich results (Aug 2023 restriction); keep for AI citation only.
- Don't add HowTo schema (deprecated Sept 2023).

## 7. Risks

- **Programmatic content devaluation**: 600+ thin tool variants flagged could devalue the whole site. Mitigation: real differentiation per page (per-school data, per-prompt analysis), or noindex the weakest tier.
- **AI-content classification**: site is openly AI-built. Mitigation: human-reviewer signals, original data, named experts.
- **Single-founder bandwidth**: roadmap assumes 15–20 hrs/week of SEO work. If less, prioritize indexation + authority over content additions.

---

## Reference docs

- `GEO-ANALYSIS.md` — AI search readiness audit (2026-05-09)
- `SEO_GUIDE.md` — On-page SEO conventions
- `SEO_CHECKLIST.md` — Pre-publish checklist
- `app/sitemap.ts` — URL hierarchy with priority tiers

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel — Join the AI Marketing Hub community
🆓 Free  → https://www.skool.com/ai-marketing-hub
⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#!/usr/bin/env node
/**
 * IndexNow submission helper.
 *
 * Submits a list of URLs to the IndexNow API (Bing, Yandex, Seznam, etc.).
 * Run after deploys that publish or significantly update pages.
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs <url> [<url> ...]
 *   node scripts/indexnow-submit.mjs --from-sitemap         # submits all URLs from sitemap.xml
 *   node scripts/indexnow-submit.mjs --recent 30            # submits sitemap URLs with lastmod within N days
 *
 * The IndexNow key file must be live at:
 *   https://getivyadmit.com/<KEY>.txt
 *
 * Env:
 *   INDEXNOW_KEY     Required. Hex key (matches the filename of the key file).
 *   INDEXNOW_HOST    Optional. Defaults to "getivyadmit.com".
 */

import { argv, env, exit } from "node:process";

const HOST = env.INDEXNOW_HOST ?? "getivyadmit.com";
const KEY = env.INDEXNOW_KEY;
if (!KEY) {
  console.error("INDEXNOW_KEY env is required (the hex key — same as the key file name).");
  exit(1);
}

const args = argv.slice(2);
let urls = [];

if (args.includes("--from-sitemap") || args.includes("--recent")) {
  const recentIdx = args.indexOf("--recent");
  const days = recentIdx >= 0 ? Number.parseInt(args[recentIdx + 1] ?? "30", 10) : null;
  const since = days ? Date.now() - days * 86_400_000 : null;
  const xml = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
  const entryRe = /<url>([\s\S]*?)<\/url>/g;
  for (const m of xml.matchAll(entryRe)) {
    const block = m[1];
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
    if (!loc) continue;
    if (since && lastmod && Date.parse(lastmod) < since) continue;
    urls.push(loc);
  }
} else {
  urls = args.filter((a) => a.startsWith("http"));
}

if (urls.length === 0) {
  console.error("No URLs to submit. Pass URLs as args or use --from-sitemap / --recent <days>.");
  exit(1);
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls,
};

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(`IndexNow ${res.status} ${res.statusText} — submitted ${urls.length} URL(s)`);
if (!res.ok) {
  console.error(await res.text());
  exit(1);
}

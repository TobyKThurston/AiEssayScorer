import { NextResponse, type NextRequest } from "next/server";

const HOST = "getivyadmit.com";
const KEY = "bddd5d4f3c61b13052de70d2d0796f1f";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// IndexNow accepts a single bulk submission per ping. Bing relays to other
// participating engines (Yandex, Seznam) — pinging api.indexnow.org is
// sufficient. https://www.indexnow.org/documentation
const ENDPOINT = "https://api.indexnow.org/indexnow";

export async function POST(req: NextRequest) {
  // Auth: require a server-side secret so this endpoint can't be abused
  // to flood the IndexNow API with arbitrary URLs from our domain.
  const secret = process.env.INDEXNOW_TRIGGER_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "INDEXNOW_TRIGGER_SECRET not configured" },
      { status: 503 },
    );
  }
  const authHeader = req.headers.get("authorization") ?? "";
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { urls?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  const urls = Array.isArray(body.urls) ? body.urls.filter((u): u is string => typeof u === "string") : [];
  if (urls.length === 0) {
    return NextResponse.json({ error: "urls[] required" }, { status: 400 });
  }

  // Reject URLs not on our host so the key file remains valid for the submission.
  const onHost = urls.filter((u) => {
    try {
      return new URL(u).host === HOST;
    } catch {
      return false;
    }
  });
  if (onHost.length === 0) {
    return NextResponse.json({ error: `no urls on ${HOST}` }, { status: 400 });
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: onHost.slice(0, 10000),
    }),
  });

  return NextResponse.json(
    {
      submitted: onHost.length,
      indexnow_status: res.status,
    },
    { status: res.ok ? 200 : 502 },
  );
}

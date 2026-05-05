import { Nav } from "@/design/Nav";
import { Footer } from "@/design/Footer";
import { Container } from "@/design/Container";
import { PaperCard } from "@/design/PaperCard";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";
import type { OddsResult } from "@/Odds/types";

export const metadata: Metadata = {
  title: "Your Admit Forecast – Ivy Admit",
  robots: { index: false, follow: false },
};

export default async function OddsResultPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; session_id?: string }>;
}) {
  const { id, session_id } = await searchParams;

  if (!id) {
    return (
      <>
        <Nav />
        <main>
          <Section>
            <PaperCard>
              <h2 className="text-ink text-[24px] font-serif">No forecast found</h2>
              <p className="mt-3 text-[14px] text-ink-2">
                Start a new calculation to see your odds.
              </p>
              <Link
                href="/odds"
                className="btn btn-ink mt-5 inline-flex text-[14px] font-semibold px-5 py-3"
              >
                Calculate my odds →
              </Link>
            </PaperCard>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: row } = await supabase
    .from("odds_calculations")
    .select("id, result, paid_session_id, user_id")
    .eq("id", id)
    .single();

  const result = row?.result as OddsResult | undefined;
  const paid =
    !!row &&
    (row.paid_session_id === session_id ||
      (session?.user.id && row.user_id === session.user.id));

  let isSubscribed = false;
  if (session?.user.id) {
    const { data: sub } = await supabase
      .from("user_subscriptions")
      .select("status")
      .eq("user_id", session.user.id)
      .eq("status", "active")
      .maybeSingle();
    isSubscribed = !!sub;
  }

  const canReveal = paid || isSubscribed;

  return (
    <>
      <Nav />
      <main>
        <Section>
          {!result ? (
            <PaperCard>
              <h2 className="text-ink text-[24px] font-serif">Forecast not found</h2>
              <p className="mt-3 text-[14px] text-ink-2">
                We couldn't locate this forecast. It may have expired.
              </p>
            </PaperCard>
          ) : !canReveal ? (
            <PaperCard>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood mb-2">
                Locked
              </div>
              <h2 className="text-ink text-[26px] font-serif">
                Subscribe to view your forecast
              </h2>
              <p className="mt-3 text-[14px] text-ink-2">
                $7/mo unlocks your full odds + tier per school, the essay reviewer
                tuned to each school you applied to, and every premium tool.
              </p>
              <Link
                href="/odds"
                className="btn btn-brand mt-5 inline-flex text-[15px] font-semibold px-6 py-3.5"
              >
                Continue to checkout →
              </Link>
            </PaperCard>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood">
                  Your admit forecast
                </div>
                <h1 className="mt-2 text-ink text-[32px] md:text-[40px] font-serif leading-[1.1]">
                  Here's where you <em className="italic text-oxblood">stand</em>.
                </h1>
              </div>

              {result.schools.map((s) => (
                <PaperCard key={s.slug}>
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
                        {s.tier}
                      </div>
                      <h3 className="text-ink text-[22px] font-serif mt-1">
                        {s.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-[44px] font-serif text-oxblood leading-none">
                        {s.percent}%
                      </div>
                      <div className="text-[11px] text-pencil mt-1">
                        admit chance
                      </div>
                    </div>
                  </div>
                  <ul className="mt-4 pt-4 border-t border-hair space-y-1.5 text-[14px] text-ink-2">
                    {s.factors.map((f, i) => (
                      <li key={i}>· {f}</li>
                    ))}
                  </ul>
                </PaperCard>
              ))}

              {!session ? (
                <PaperCard>
                  <h3 className="text-ink text-[18px] font-serif">
                    Save this forecast to your account
                  </h3>
                  <p className="mt-2 text-[13.5px] text-ink-2">
                    Set a password to log back in anytime and access the essay grader, all tools, and future calculations.
                  </p>
                  <Link
                    href={`/auth/login?claim=1&id=${id}`}
                    className="btn btn-ink mt-4 inline-flex text-[14px] font-semibold px-5 py-3"
                  >
                    Set up my account →
                  </Link>
                </PaperCard>
              ) : (
                <div className="text-center pt-4">
                  <Link
                    href="/essay-grader"
                    className="btn btn-ink text-[15px] font-semibold px-7 py-3.5"
                  >
                    Grade my essay next →
                  </Link>
                </div>
              )}
            </div>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="pt-10 md:pt-14 pb-20">
      <Container>
        <div className="max-w-[640px] mx-auto">{children}</div>
      </Container>
    </section>
  );
}

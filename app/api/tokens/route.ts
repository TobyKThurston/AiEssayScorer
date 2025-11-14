import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: userTokens, error } = await supabase
      .from("user_tokens")
      .select("tokens")
      .eq("user_id", session.user.id)
      .single();

    if (error || !userTokens) {
      // If no record exists, create one with 1 token
      const { data: newTokens } = await supabase
        .from("user_tokens")
        .insert({
          user_id: session.user.id,
          tokens: 1,
        })
        .select("tokens")
        .single();

      return NextResponse.json({ tokens: newTokens?.tokens || 0 });
    }

    return NextResponse.json({ tokens: userTokens.tokens });
  } catch (error: any) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json(
      { error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
}


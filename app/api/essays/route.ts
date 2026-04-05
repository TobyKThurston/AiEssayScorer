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

    const { data: essays, error } = await supabase
      .from("essays")
      .select("*")
      .eq("user_id", session.user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ essays });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch essays";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title } = await request.json();

    const { data: essay, error } = await supabase
      .from("essays")
      .insert({
        user_id: session.user.id,
        title: title || "Untitled Essay",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ essay });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create essay";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

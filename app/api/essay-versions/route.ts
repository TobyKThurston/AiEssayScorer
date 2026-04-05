import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const essayId = searchParams.get("essayId");

    if (!essayId) {
      return NextResponse.json({ error: "essayId is required" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: versions, error } = await supabase
      .from("essay_versions")
      .select("*")
      .eq("essay_id", essayId)
      .order("version_number", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ versions });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch versions";
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

    const { essayId, content, essayType, targetSchools, essayPrompt, analysis, label } =
      await request.json();

    if (!essayId || content === undefined) {
      return NextResponse.json(
        { error: "essayId and content are required" },
        { status: 400 }
      );
    }

    // Verify ownership
    const { data: essay } = await supabase
      .from("essays")
      .select("id")
      .eq("id", essayId)
      .eq("user_id", session.user.id)
      .single();

    if (!essay) {
      return NextResponse.json({ error: "Essay not found" }, { status: 404 });
    }

    // Get next version number
    const { data: maxVersionRow } = await supabase
      .from("essay_versions")
      .select("version_number")
      .eq("essay_id", essayId)
      .order("version_number", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextVersion = (maxVersionRow?.version_number ?? 0) + 1;

    const { data: version, error } = await supabase
      .from("essay_versions")
      .insert({
        essay_id: essayId,
        content,
        essay_type: essayType ?? "",
        target_schools: targetSchools ?? [],
        essay_prompt: essayPrompt ?? "",
        analysis: analysis ?? null,
        version_number: nextVersion,
        label: label ?? null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Touch updated_at on essays (trigger handles the rest)
    await supabase
      .from("essays")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", essayId);

    return NextResponse.json({ version });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save version";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

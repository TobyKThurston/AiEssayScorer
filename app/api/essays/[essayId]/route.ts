import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ essayId: string }> }
) {
  try {
    const { essayId } = await params;
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: essay, error } = await supabase
      .from("essays")
      .select("*")
      .eq("id", essayId)
      .eq("user_id", session.user.id)
      .single();

    if (error || !essay) {
      return NextResponse.json({ error: "Essay not found" }, { status: 404 });
    }

    const { data: latestVersion } = await supabase
      .from("essay_versions")
      .select("*")
      .eq("essay_id", essayId)
      .order("version_number", { ascending: false })
      .limit(1)
      .maybeSingle();

    return NextResponse.json({ essay, latestVersion: latestVersion ?? null });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch essay";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ essayId: string }> }
) {
  try {
    const { essayId } = await params;
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
      .update({ title })
      .eq("id", essayId)
      .eq("user_id", session.user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ essay });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update essay";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

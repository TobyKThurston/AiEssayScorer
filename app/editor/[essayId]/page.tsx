import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditorPage } from "@/Editor/EditorPage";

export const metadata = {
  title: "Essay Editor | Ivy Admit",
  robots: { index: false },
};

export default async function EditorPageRoute({
  params,
}: {
  params: Promise<{ essayId: string }>;
}) {
  const { essayId } = await params;

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(`/auth/login?next=/editor/${essayId}`);
  }

  return <EditorPage essayId={essayId} />;
}

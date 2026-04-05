import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditorApp from "@/Editor/App";

export const metadata = {
  title: "My Essays | Ivy Admit",
  description: "Write and analyze your college essays",
  robots: { index: false },
};

export default async function EditorListPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login?next=/editor");
  }

  return <EditorApp />;
}

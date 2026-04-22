import { Nav } from "@/design/Nav";
import { Footer } from "@/design/Footer";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

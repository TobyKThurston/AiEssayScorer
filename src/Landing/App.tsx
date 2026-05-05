import { Nav } from "@/design/Nav";
import { Footer } from "@/design/Footer";
import { Hero } from "./components/Hero";
import { ProofStrip } from "./components/ProofStrip";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { Closer } from "./components/Closer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <Closer />
      </main>
      <Footer />
    </>
  );
}

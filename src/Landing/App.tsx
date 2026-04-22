import { Nav } from "@/design/Nav";
import { Footer } from "@/design/Footer";
import { Hero } from "./components/Hero";
import { ProofStrip } from "./components/ProofStrip";
import { ValueProps } from "./components/ValueProps";
import { HowItWorks } from "./components/HowItWorks";
import { ProductTour } from "./components/ProductTour";
import { Stats } from "./components/Stats";
import { Compare } from "./components/Compare";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Closer } from "./components/Closer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <ValueProps />
        <HowItWorks />
        <ProductTour />
        <Stats />
        <Compare />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Closer />
      </main>
      <Footer />
    </>
  );
}

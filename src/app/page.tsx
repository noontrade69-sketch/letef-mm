import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Flow from "@/components/Flow";
import Fees from "@/components/Fees";
import Vaults from "@/components/Vaults";
import Commands from "@/components/Commands";
import Vouches from "@/components/Vouches";
import Faq from "@/components/Faq";
import Support, { FinalCta } from "@/components/Support";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Reveal>
          <Hero />
          <Flow />
          <Fees />
          <Vaults />
          <Commands />
          <Vouches />
          <Faq />
          <Support />
        </Reveal>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

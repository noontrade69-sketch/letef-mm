import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import Highlights from "@/components/Highlights";
import Story from "@/components/Story";
import Dispute from "@/components/Dispute";
import Fees from "@/components/Fees";
import Security from "@/components/Security";
import Market from "@/components/Market";
import Vouches from "@/components/Vouches";
import Commands from "@/components/Commands";
import Faq from "@/components/Faq";
import Support, { Terms } from "@/components/Support";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <Loader />
      <Header />
      <main>
        <Reveal>
          <Hero />
          <Marquee />
          <Problem />
          <Highlights />
        </Reveal>
        <Story />
        <Reveal>
          <Dispute />
          <Fees />
          <Security />
          <Market />
          <Vouches />
          <Commands />
          <Faq />
          <Support />
          <Terms />
        </Reveal>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

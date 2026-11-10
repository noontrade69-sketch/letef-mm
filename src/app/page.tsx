import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Promise from "@/components/Promise";
import Highlights from "@/components/Highlights";
import HowItWorks from "@/components/HowItWorks";
import Fees from "@/components/Fees";
import Security from "@/components/Security";
import Vouches from "@/components/Vouches";
import Commands from "@/components/Commands";
import Faq from "@/components/Faq";
import Support from "@/components/Support";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Promise />
        <Highlights />
        <HowItWorks />
        <Fees />
        <Security />
        <Vouches />
        <Commands />
        <Faq />
        <Support />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}

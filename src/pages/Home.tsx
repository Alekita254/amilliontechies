import { Hero } from "../components/Hero";
import { Sponsors } from "../components/Sponsors";
import { About } from "../components/About";
import { HowItWorks } from "../components/HowItWorks";
import { Features } from "../components/Features";
import { Services } from "../components/Services";
import { Newsletter } from "../components/Newsletter";
import { FAQ } from "../components/FAQ";

export const Home = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Newsletter />
      <FAQ />
    </>
  );
};

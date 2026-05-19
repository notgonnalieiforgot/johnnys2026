import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StoryTimeline from "@/components/StoryTimeline";
import ProductGrid from "@/components/ProductGrid";
import Locations from "@/components/Locations";
import Testimonials from "@/components/Testimonials";
import LoyaltyChecker from "@/components/LoyaltyChecker";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <StoryTimeline />
        <ProductGrid />
        <Locations />
        <Testimonials />
        <LoyaltyChecker />
      </main>
      <Footer />
    </>
  );
}

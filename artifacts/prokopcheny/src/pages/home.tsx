import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { WhyUs } from "@/components/why-us";
import { Catalog } from "@/components/catalog";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { CartButton } from "@/components/cart-button";
import { CartDrawer } from "@/components/cart-drawer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <Header />
      <Hero />
      <About />
      <WhyUs />
      <Catalog />
      <Contact />
      <Footer />
      <CartButton />
      <CartDrawer />
    </main>
  );
}

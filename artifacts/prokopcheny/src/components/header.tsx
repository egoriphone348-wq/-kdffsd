import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-sm" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a 
          href="#" 
          className={`font-['Ruslan_Display'] text-2xl md:text-3xl transition-colors ${
            scrolled ? "text-primary" : "text-[#E8D9C5] drop-shadow-md"
          }`}
        >
          #ПроКопчёный
        </a>

        <nav className="hidden md:flex gap-8">
          <a 
            href="#about" 
            className={`font-serif text-sm uppercase tracking-wider hover:text-accent transition-colors ${
              scrolled ? "text-primary" : "text-[#E8D9C5]"
            }`}
          >
            О нас
          </a>
          <a 
            href="#catalog" 
            className={`font-serif text-sm uppercase tracking-wider hover:text-accent transition-colors ${
              scrolled ? "text-primary" : "text-[#E8D9C5]"
            }`}
          >
            Каталог
          </a>
          <a 
            href="#contact" 
            className={`font-serif text-sm uppercase tracking-wider hover:text-accent transition-colors ${
              scrolled ? "text-primary" : "text-[#E8D9C5]"
            }`}
          >
            Контакты
          </a>
        </nav>

        <a 
          href="tel:+79009228585"
          className={`font-sans font-bold transition-colors hidden sm:block ${
            scrolled ? "text-primary hover:text-accent" : "text-[#E8D9C5] hover:text-white drop-shadow-md"
          }`}
        >
          +7 900 922-85-85
        </a>
      </div>
    </motion.header>
  );
}

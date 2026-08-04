import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "О нас" },
  { href: "#catalog", label: "Каталог" },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // Small delay to let animation finish
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-background/95 backdrop-blur-md border-b border-border py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className={`font-['Ruslan_Display'] text-xl sm:text-2xl md:text-3xl transition-colors ${
              scrolled || menuOpen ? "text-primary" : "text-[#E8D9C5] drop-shadow-md"
            }`}
          >
            #ПроКопчёный
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-serif text-sm uppercase tracking-wider hover:text-accent transition-colors ${
                  scrolled ? "text-primary" : "text-[#E8D9C5]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop phone */}
          <a
            href="tel:+79009228585"
            className={`font-sans font-bold transition-colors hidden md:block ${
              scrolled ? "text-primary hover:text-accent" : "text-[#E8D9C5] hover:text-white drop-shadow-md"
            }`}
          >
            +7 900 922-85-85
          </a>

          {/* Mobile right side */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="tel:+79009228585"
              className={`transition-colors ${
                scrolled || menuOpen ? "text-primary" : "text-[#E8D9C5] drop-shadow-md"
              }`}
              aria-label="Позвонить"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              className={`transition-colors ${
                scrolled || menuOpen ? "text-primary" : "text-[#E8D9C5] drop-shadow-md"
              }`}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-sm flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNavClick(link.href)}
                className="font-['Ruslan_Display'] text-4xl text-primary hover:text-accent transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              href="tel:+79009228585"
              className="font-sans text-xl font-bold text-accent mt-4"
            >
              +7 900 922-85-85
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

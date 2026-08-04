import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black flex flex-col items-center justify-center">
      {/* Background Image with Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center animate-slow-zoom"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Smoke particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="smoke-particle" />
        <div className="smoke-particle" />
        <div className="smoke-particle" />
        <div className="smoke-particle" />
        <div className="smoke-particle" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto h-full mt-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[#E8D9C5] tracking-[0.15em] uppercase text-xs sm:text-sm md:text-base font-sans mb-4 sm:mb-6"
        >
          Натуральное копчение по-старинному рецепту
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="font-['Ruslan_Display'] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#E8D9C5] drop-shadow-lg mb-4"
        >
          ПроКопчёный
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-3 sm:gap-4 text-[#E8D9C5] opacity-80"
        >
          <div className="h-px w-8 sm:w-12 bg-current" />
          <span className="font-serif italic text-lg sm:text-xl md:text-2xl">Традиции вкуса</span>
          <div className="h-px w-8 sm:w-12 bg-current" />
        </motion.div>
      </div>

      {/* Contact Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-t border-border py-3 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-xs sm:text-sm font-sans">
          <div className="flex items-center gap-2">
            <MapPin className="text-accent w-4 h-4 shrink-0" />
            <span className="text-center sm:text-left">с. Кафтанчиково, ул. Звёздная, 7</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Phone className="text-accent w-4 h-4 shrink-0" />
              <a href="tel:+79009228585" className="hover:text-accent transition-colors font-bold">
                +7 900 922-85-85
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Clock className="text-accent w-4 h-4 shrink-0" />
              <span>Пн–Вс: 10:00–21:00</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

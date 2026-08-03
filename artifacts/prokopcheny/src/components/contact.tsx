import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";

export function Contact() {
  const { targetRef, isIntersecting } = useIntersectionObserver();

  return (
    <section id="contact" className="py-24 px-4 bg-background relative">
      <div 
        ref={targetRef as any}
        className={`max-w-5xl mx-auto fade-in-section ${isIntersecting ? 'is-visible' : ''}`}
      >
        <div className="text-center mb-16">
          <h2 className="font-['Ruslan_Display'] text-5xl md:text-6xl text-primary mb-4 uppercase">
            Как нас найти
          </h2>
          <div className="ornament-divider">
            <span className="text-xl">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-card p-8 md:p-12 border-4 border-border shadow-xl relative">
          {/* Paper corners effect */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent" />

          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="font-serif text-sm font-bold text-accent mb-2 uppercase tracking-[0.2em]">
                Наш адрес
              </h3>
              <p className="font-serif text-2xl text-primary">
                Томская область, Томский район,<br/>
                с. Кафтанчиково, ул. Звёздная, 7
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-sm font-bold text-accent mb-2 uppercase tracking-[0.2em]">
                Свяжитесь с нами
              </h3>
              <div className="space-y-2">
                <a href="tel:+79009228585" className="block font-serif text-3xl text-primary hover:text-accent transition-colors">
                  +7 900 922-85-85
                </a>
                <a href="tel:+73822259685" className="block font-serif text-xl text-primary hover:text-accent transition-colors">
                  +7 (3822) 25-96-85
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-sm font-bold text-accent mb-2 uppercase tracking-[0.2em]">
                Часы работы
              </h3>
              <div className="font-sans text-lg text-primary">
                <p>Пн–Чт: 10:00 – 20:00</p>
                <p>Пт–Вс: 10:00 – 21:00</p>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="w-full md:w-auto font-serif text-lg tracking-wide rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary transition-all">
                <a href="tel:+79009228585">Заказать сейчас</a>
              </Button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full min-h-[300px] md:h-full border-4 border-border bg-muted flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://api.maptiler.com/maps/basic/256/0/0/0.png')] bg-cover opacity-50 sepia contrast-125" />
            <div className="absolute inset-0 bg-[#E8D9C5]/40 mix-blend-multiply" />
            
            <div className="relative z-10 flex flex-col items-center bg-background/90 p-6 border-2 border-border shadow-lg">
              <span className="text-4xl mb-2">📍</span>
              <span className="font-serif font-bold text-primary">Кафтанчиково</span>
              <span className="font-sans text-sm mt-1 opacity-70">Карта</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

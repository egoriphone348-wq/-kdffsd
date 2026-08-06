import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { InteractiveMap } from "@/components/map";

export function Contact() {
  const { targetRef, isIntersecting } = useIntersectionObserver();

  return (
    <section id="contact" className="py-16 px-4 bg-background relative">
      <div
        ref={targetRef as any}
        className={`max-w-5xl mx-auto fade-in-section ${isIntersecting ? "is-visible" : ""}`}
      >
        <div className="text-center mb-10">
          <h2 className="font-['Ruslan_Display'] text-4xl sm:text-5xl md:text-6xl text-primary mb-4 uppercase">
            Как нас найти
          </h2>
          <div className="ornament-divider">
            <span className="text-xl">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-card border-4 border-border shadow-xl relative">
          {/* Paper corners effect */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent z-10" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent z-10" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent z-10" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent z-10" />

          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-6 p-8 md:p-10">
            <div>
              <h3 className="font-serif text-xs font-bold text-accent mb-2 uppercase tracking-[0.2em]">
                Наш адрес
              </h3>
              <p className="font-serif text-xl sm:text-2xl text-primary leading-snug">
                Томская область, Томский район,<br />
                с. Кафтанчиково, ул. Звёздная, 7
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xs font-bold text-accent mb-2 uppercase tracking-[0.2em]">
                Свяжитесь с нами
              </h3>
              <div className="space-y-1">
                <a
                  href="tel:+79009228585"
                  className="block font-serif text-2xl sm:text-3xl text-primary hover:text-accent transition-colors"
                >
                  +7 900 922-85-85
                </a>
                <a
                  href="tel:+73822259685"
                  className="block font-serif text-lg sm:text-xl text-primary hover:text-accent transition-colors"
                >
                  +7 (3822) 25-96-85
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xs font-bold text-accent mb-2 uppercase tracking-[0.2em]">
                Часы работы
              </h3>
              <div className="font-sans text-base sm:text-lg text-primary space-y-0.5">
                <p>Пн–Чт: 10:00 – 20:00</p>
                <p>Пт–Вс: 10:00 – 21:00</p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="w-full font-serif text-base sm:text-lg tracking-wide rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary transition-all"
              >
                <a href="tel:+79009228585">Заказать сейчас</a>
              </Button>
            </div>

            {/* МЫ В МАХ */}
            <a
              href="https://max.ru/join/QOewwatVhrUsVkCaBk1F9U16jmF5u3ZeW2V-7El9UHc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full border-2 border-accent/60 hover:border-accent bg-accent/5 hover:bg-accent/10 transition-all px-5 py-3 group"
            >
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xs uppercase tracking-[0.2em] text-accent font-bold">
                  Мы в МАХ
                </span>
                <span className="font-sans text-xs text-muted-foreground">
                  Напишите нам в мессенджер
                </span>
              </div>
              <svg
                className="ml-auto w-4 h-4 text-accent opacity-60 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Interactive Map */}
          <div className="w-full h-[320px] md:h-full min-h-[320px]">
            <InteractiveMap />
          </div>
        </div>
      </div>
    </section>
  );
}

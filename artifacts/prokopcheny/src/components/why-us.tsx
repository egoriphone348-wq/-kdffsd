import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import sausagesBg from "@assets/generated_images/sausages.jpg";

export function WhyUs() {
  const { targetRef, isIntersecting } = useIntersectionObserver();

  return (
    <section className="py-24 px-4 bg-[#1A110D] text-[#E8D9C5] relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 sepia"
        style={{ backgroundImage: `url(${sausagesBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A110D] via-transparent to-[#1A110D]" />

      <div 
        ref={targetRef as any}
        className={`max-w-4xl mx-auto text-center relative z-10 fade-in-section ${isIntersecting ? 'is-visible' : ''}`}
      >
        <span className="font-sans tracking-[0.3em] uppercase text-accent text-sm md:text-base font-bold mb-4 block">
          Наши Принципы
        </span>
        <h2 className="font-['Ruslan_Display'] text-5xl md:text-6xl mb-8 leading-tight drop-shadow-xl">
          Качество. Вкус. Традиции.
        </h2>
        
        <div className="w-24 h-1 bg-accent mx-auto mb-10 opacity-80" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-[#E8D9C5]/10 bg-black/40 backdrop-blur-sm">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="font-serif text-xl font-bold mb-3 uppercase">
              100% Натурально
            </h3>
            <p className="font-sans text-sm opacity-70">
              Никаких усилителей вкуса, жидкого дыма или искусственных красителей. 
              Только чистое мясо, соль, специи и настоящий древесный дым.
            </p>
          </div>

          <div className="p-6 border border-[#E8D9C5]/10 bg-black/40 backdrop-blur-sm">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="font-serif text-xl font-bold mb-3 uppercase">
              Осиновая щепа
            </h3>
            <p className="font-sans text-sm opacity-70">
              Копчение на отборной осиновой щепе придаёт деликатесам тот самый 
              золотистый цвет и глубокий, богатый аромат деревенской печи.
            </p>
          </div>

          <div className="p-6 border border-[#E8D9C5]/10 bg-black/40 backdrop-blur-sm">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="font-serif text-xl font-bold mb-3 uppercase">
              ГОСТ Качество
            </h3>
            <p className="font-sans text-sm opacity-70">
              Мы строго следим за соблюдением всех стандартов на каждом этапе, 
              чтобы вы получали только лучший продукт премиум-класса.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Leaf, Utensils, Flame, ShieldCheck } from "lucide-react";
import poultryBg from "@assets/generated_images/poultry.jpg";
import porkBg from "@assets/generated_images/pork.jpg";

export function About() {
  const { targetRef, isIntersecting } = useIntersectionObserver();

  return (
    <section 
      id="about" 
      className="py-24 px-4 bg-background relative overflow-hidden"
    >
      <div 
        ref={targetRef as any}
        className={`max-w-5xl mx-auto fade-in-section ${isIntersecting ? 'is-visible' : ''}`}
      >
        <div className="text-center mb-16">
          <div className="inline-block p-4 border border-border rounded-full mb-6">
            {/* Stamp/Seal placeholder */}
            <div className="w-16 h-16 border border-primary rounded-full flex flex-col items-center justify-center font-serif text-[10px] leading-tight text-primary uppercase">
              <span className="font-bold">ОТК</span>
              <div className="w-8 h-px bg-primary my-1"></div>
              <span>Контроль<br/>Качества</span>
            </div>
          </div>
          
          <h2 className="font-['Ruslan_Display'] text-5xl md:text-6xl text-primary mb-4">
            Собственное Производство
          </h2>
          <div className="ornament-divider">
            <span className="text-xl">★</span>
          </div>
          <p className="font-sans text-lg md:text-xl text-primary max-w-2xl mx-auto italic">
            Мы сохраняем традиции натурального копчения, чтобы радовать вас настоящим вкусом и ароматом деревенских деликатесов.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {/* Features */}
          <div className="space-y-10">
            <Feature 
              icon="🌿"
              title="Работаем с натуральным сырьём"
              desc="Только отборные продукты и понятные ингредиенты. Без усилителей вкуса и искусственных добавок."
            />
            <Feature 
              icon="🧂"
              title="Авторский деликатный посол"
              desc="Собственная вкусовая подача и бережный подход к продукту, раскрывающий его естественный вкус."
            />
            <Feature 
              icon="♨️"
              title="Традиционное копчение"
              desc="Натуральная щепа, ремесленные приёмы и богатый аромат. Коптим старинными методами."
            />
            <Feature 
              icon="🛡️"
              title="Контроль на каждом этапе"
              desc="Строгий контроль качества от сырья до готового деликатеса, который станет украшением стола."
            />
          </div>

          {/* Image composition */}
          <div className="relative hidden md:block">
             <div 
               className="absolute inset-0 bg-cover bg-center shadow-xl border-4 border-border rotate-2 transform hover:rotate-0 transition-transform duration-500" 
               style={{ backgroundImage: `url(${poultryBg})` }}
             />
             <div 
               className="absolute -bottom-8 -left-8 w-2/3 aspect-square bg-cover bg-center shadow-xl border-4 border-border -rotate-3 transform hover:rotate-0 transition-transform duration-500"
               style={{ backgroundImage: `url(${porkBg})` }}
             />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-12 h-12 border-2 border-accent rounded-full flex items-center justify-center text-2xl text-accent">
        {icon}
      </div>
      <div>
        <h3 className="font-serif text-xl font-bold text-primary mb-2 uppercase tracking-wide">
          {title}
        </h3>
        <p className="font-sans text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

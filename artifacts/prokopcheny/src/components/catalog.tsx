import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

import porkBg from "@assets/generated_images/pork.jpg";
import poultryBg from "@assets/generated_images/poultry.jpg";
import beefBg from "@assets/generated_images/beef.jpg";
import sausagesBg from "@assets/generated_images/sausages.jpg";
import fishBg from "@assets/generated_images/fish.jpg";
import sturgeonBg from "@assets/generated_images/sturgeon.jpg";
import stewBg from "@assets/generated_images/stew.jpg";

const CATEGORIES = [
  { id: "hot-pork", name: "Свинина (Горячее)", icon: "🥓" },
  { id: "hot-poultry", name: "Птица (Горячее)", icon: "🍗" },
  { id: "hot-beef", name: "Говядина", icon: "🥩" },
  { id: "sausages", name: "Колбасы", icon: "🌭" },
  { id: "hot-fish", name: "Рыба (Горячее)", icon: "🐟" },
  { id: "cold-fish", name: "Рыба (Холодное)", icon: "❄️" },
  { id: "sturgeon", name: "Царская Рыба", icon: "👑" },
  { id: "stew", name: "Тушёнка", icon: "🫙" },
];

const PRODUCTS = {
  "hot-pork": [
    { name: "Грудинка", desc: "Нежная и сочная, с тонким дымным ароматом." },
    { name: "Окорок", desc: "Сочный окорок с аппетитной золотистой корочкой." },
    { name: "Карбонат", desc: "Мягкий и ароматный карбонат с изысканным вкусом." },
    { name: "Шея", desc: "Сочная шея с насыщенным вкусом и мраморной структурой." },
    { name: "Рёбра", desc: "Ароматные рёбра с пикантной корочкой и мясной сочностью." },
  ],
  "hot-poultry": [
    { name: "Цыплёнок табака", desc: "Подкопчённый, сочная мякоть и хрустящая корочка." },
    { name: "Курица целая", desc: "Нежное мясо с деликатным ароматом копчения." },
    { name: "Куриные крылья", desc: "Ароматные, румяные крылья. Идеально для перекуса." },
    { name: "Куриные голени", desc: "Сочные голени с лёгким копчёным ароматом." },
    { name: "Индейка", desc: "Мясо индейки нежное и питательное." },
    { name: "Крылья/Голени индейки", desc: "Крупные, мясистые, с насыщенным ароматом." },
    { name: "Утка", desc: "Богатый вкус и аромат, настоящее украшение стола." },
  ],
  "hot-beef": [
    { name: "Толстый край", desc: "Насыщенный говяжий вкус с ароматом дымка." },
    { name: "Рибай medium", desc: "Премиальный отруб, деликатное копчение." },
  ],
  "sausages": [
    { name: "Охотничьи", desc: "Классические колбаски с ярким вкусом специй." },
    { name: "Деревенские", desc: "По старинному рецепту, крупная рубка." },
    { name: "Полукопчёные", desc: "Универсальные колбасы для любого стола." },
    { name: "Домашние", desc: "С натуральным чесноком и перцем." },
  ],
  "hot-fish": [
    { name: "Терпуг", desc: "Золотистая корочка и нежное белое мясо." },
    { name: "Скумбрия", desc: "Жирная, сочная рыба горячего копчения." },
    { name: "Радужная форель", desc: "Деликатесная красная рыба с благородным вкусом." },
  ],
  "cold-fish": [
    { name: "Щука", desc: "Классика сибирских рек, плотное мясо." },
    { name: "Судак", desc: "Диетическое мясо с тонким ароматом." },
    { name: "Язь", desc: "Традиционная сибирская закуска." },
    { name: "Лещ", desc: "Жирный и вкусный лещ холодного копчения." },
    { name: "Окунь", desc: "Прекрасная закуска с золотистой чешуей." },
    { name: "Скумбрия", desc: "Холодное копчение сохраняет все полезные свойства." },
    { name: "Лосось / Сиговые", desc: "Благородная рыба высшего сорта." },
  ],
  "sturgeon": [
    { name: "Осётр холодного копчения", desc: "Царский деликатес, тающий во рту." },
    { name: "Осётр горячего копчения", desc: "Неповторимый вкус и аромат настоящей осетрины." },
  ],
  "stew": [
    { name: "Говядина тушёная", desc: "Мясо высшего сорта, натуральные специи." },
    { name: "Свинина тушёная", desc: "Сочная, приготовленная в собственном соку." },
    { name: "Индейка тушёная", desc: "Диетический продукт с нежным вкусом." },
    { name: "Основа для супов", desc: "Насыщенный говяжий бульон длительного томления." },
  ]
};

const CATEGORY_IMAGES: Record<string, string> = {
  "hot-pork": porkBg,
  "hot-poultry": poultryBg,
  "hot-beef": beefBg,
  "sausages": sausagesBg,
  "hot-fish": fishBg,
  "cold-fish": fishBg,
  "sturgeon": sturgeonBg,
  "stew": stewBg,
};

export function Catalog() {
  const { targetRef, isIntersecting } = useIntersectionObserver();
  const [activeTab, setActiveTab] = useState("hot-pork");

  return (
    <section id="catalog" className="py-24 px-4 bg-card border-y-4 border-border/30 relative">
      <div 
        ref={targetRef as any}
        className={`max-w-6xl mx-auto fade-in-section ${isIntersecting ? 'is-visible' : ''}`}
      >
        <div className="text-center mb-12">
          <h2 className="font-['Ruslan_Display'] text-5xl md:text-6xl text-primary mb-4 uppercase">
            Каталог Продукции
          </h2>
          <div className="ornament-divider">
            <span className="text-xl">❋</span>
          </div>
          <p className="font-sans text-lg text-primary max-w-2xl mx-auto italic mb-4">
            Цены актуальны по запросу — звоните!
          </p>
        </div>

        <Tabs defaultValue="hot-pork" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap justify-center h-auto bg-transparent mb-12 gap-2">
            {CATEGORIES.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="font-serif text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border/50 rounded-none px-6 py-3 transition-colors"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(PRODUCTS).map(([catId, products]) => (
            <TabsContent key={catId} value={catId} className="animate-in fade-in zoom-in duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Category Image */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/3] w-full border-8 border-background shadow-2xl relative overflow-hidden group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${CATEGORY_IMAGES[catId]})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <h3 className="absolute bottom-6 left-6 right-6 font-['Ruslan_Display'] text-3xl text-white drop-shadow-md">
                      {CATEGORIES.find(c => c.id === catId)?.name}
                    </h3>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((p, idx) => (
                    <ProductCard key={idx} name={p.name} desc={p.desc} />
                  ))}
                </div>

              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function ProductCard({ name, desc }: { name: string, desc: string }) {
  return (
    <div className="p-4 border-2 border-border/20 bg-background/50 hover:bg-background transition-colors group cursor-default relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="font-serif text-4xl">#</span>
      </div>
      <h4 className="font-serif font-bold text-xl text-primary mb-2 uppercase tracking-wide pr-8">
        {name}
      </h4>
      <p className="font-sans text-sm text-muted-foreground mb-4 leading-relaxed min-h-[3rem] flex-grow">
        {desc}
      </p>
      <div className="flex justify-between items-end border-t border-border/30 pt-3 mt-auto">
        <span className="font-sans text-xs italic text-accent">Цена по запросу</span>
        <span className="font-serif font-bold text-lg text-primary">— ₽/кг</span>
      </div>
    </div>
  );
}

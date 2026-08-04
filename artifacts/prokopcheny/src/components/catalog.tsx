import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const CATEGORIES = [
  { id: "meat", name: "Мясо", icon: "🥓" },
  { id: "poultry", name: "Птица", icon: "🍗" },
  { id: "beef", name: "Говядина", icon: "🥩" },
  { id: "shashlik", name: "Шашлык", icon: "🔥" },
  { id: "hot-fish", name: "Рыба г/к", icon: "🐟" },
  { id: "cold-fish", name: "Рыба х/к", icon: "❄️" },
  { id: "stew", name: "Тушёнка", icon: "🫙" },
];

interface Product {
  name: string;
  desc: string;
  price: string;
  unit?: string;
  img?: string;
  variants?: { label: string; price: string }[];
}

const PRODUCTS: Record<string, Product[]> = {
  "meat": [
    { name: "Грудинка",         desc: "Нежная и сочная, с тонким дымным ароматом.",                    price: "850",  unit: "р/кг", img: "/products/grudinka.jpg" },
    { name: "Шея",              desc: "Сочная шея с насыщенным вкусом и мраморной структурой.",          price: "1300", unit: "р/кг", img: "/products/sheya.jpg" },
    { name: "Ребро",            desc: "Ароматные рёбра с пикантной корочкой и мясной сочностью.",        price: "550",  unit: "р/кг", img: "/products/rebra.jpg" },
    { name: "Лопатка",          desc: "Нежное мясо лопаточной части с лёгким дымным привкусом.",         price: "980",  unit: "р/кг", img: "/products/lopatka.jpg" },
    { name: "Сало по-домашнему",desc: "По старинному рецепту, мягкое и ароматное.",                     price: "750",  unit: "р/кг", img: "/products/salo-domashneye.jpg" },
    { name: "Сало копчёное",    desc: "Классическое копчёное сало с насыщенным ароматом.",               price: "850",  unit: "р/кг", img: "/products/salo-kopchenoe.jpg" },
    { name: "Карбонат",         desc: "Мягкий и ароматный карбонат с изысканным вкусом.",               price: "1100", unit: "р/кг", img: "/products/karbonat.jpg" },
    { name: "Окорок",           desc: "Сочный окорок с аппетитной золотистой корочкой.",                price: "980",  unit: "р/кг", img: "/products/okrok.jpg" },
    { name: "Уши",              desc: "Традиционная закуска — хрустящие и ароматные.",                  price: "750",  unit: "р/кг", img: "/products/ushi.jpg" },
    { name: "Рулька",           desc: "Сочная рулька с тонкой ароматной корочкой.",                     price: "500",  unit: "р/кг", img: "/products/rulka.jpg" },
  ],
  "poultry": [
    { name: "Курица",  desc: "Нежное мясо с деликатным ароматом копчения.",          price: "750", unit: "р/кг", img: "/products/chicken.jpg" },
    { name: "Крылья",  desc: "Ароматные, румяные крылья — идеально для перекуса.",   price: "650", unit: "р/кг", img: "/products/krylya.jpg" },
  ],
  "beef": [
    { name: "Говядина г/к", desc: "Насыщенный говяжий вкус с ароматом дымка.", price: "200", unit: "р/100г", img: "/products/govjadina.jpg" },
  ],
  "shashlik": [
    { name: "Шашлык", desc: "Готовый шашлык по домашнему рецепту, сочный и ароматный.", price: "600", unit: "р/кг", img: "/products/shashlik.jpg" },
  ],
  "hot-fish": [
    { name: "Терпуг г/к",   desc: "Золотистая корочка и нежное белое мясо.",    price: "940", unit: "р/кг", img: "/products/terpug.jpg" },
    { name: "Скумбрия г/к", desc: "Жирная, сочная рыба горячего копчения.",     price: "950", unit: "р/кг", img: "/products/fish-hot.jpg" },
    { name: "Щука г/к",     desc: "Классика сибирских рек, плотное мясо.",       price: "840", unit: "р/кг", img: "/products/shchuka.jpg" },
    { name: "Окунь г/к",    desc: "Прекрасная закуска с золотистой чешуей.",     price: "650", unit: "р/кг", img: "/products/okun.jpg" },
    { name: "Судак г/к",    desc: "Диетическое мясо с тонким ароматом.",         price: "940", unit: "р/кг", img: "/products/sudak.jpg" },
  ],
  "cold-fish": [
    { name: "Нерка х/к",     desc: "Благородная красная рыба холодного копчения.",                  price: "3000", unit: "р/кг", img: "/products/nerka.jpg" },
    { name: "Форель х/к",    desc: "Деликатесная форель с тонким изысканным вкусом.",               price: "2500", unit: "р/кг", img: "/products/forel.jpg" },
    { name: "Скумбрия х/к",  desc: "Холодное копчение сохраняет все полезные свойства.",            price: "1100", unit: "р/кг", img: "/products/skumbriya-cold.jpg" },
  ],
  "stew": [
    {
      name: "Бульон говяжий",
      desc: "Насыщенный говяжий бульон длительного томления.",
      price: "250", unit: "р / 0,5л",
      img: "/products/tushyonka.jpg",
    },
    {
      name: "Свинина тушёная",
      desc: "Сочная свинина, приготовленная в собственном соку.",
      price: "350", unit: "р / 0,35л",
      img: "/products/tushyonka.jpg",
      variants: [{ label: "0,35л", price: "350 р" }, { label: "0,5л", price: "500 р" }],
    },
    {
      name: "Говядина тушёная",
      desc: "Мясо высшего сорта, натуральные специи.",
      price: "500", unit: "р / 0,35л",
      img: "/products/tushyonka.jpg",
      variants: [{ label: "0,35л", price: "500 р" }, { label: "0,5л", price: "700 р" }],
    },
    {
      name: "Индейка тушёная",
      desc: "Диетический продукт с нежным вкусом.",
      price: "450", unit: "р / 0,35л",
      img: "/products/tushyonka.jpg",
      variants: [{ label: "0,35л", price: "450 р" }, { label: "0,5л", price: "650 р" }],
    },
  ],
};

const CATEGORY_IMAGES: Record<string, string> = {
  "meat":      "/products/myaso-narez.jpg",
  "poultry":   "/products/chicken.jpg",
  "beef":      "/products/govjadina.jpg",
  "shashlik":  "/products/shashlik.jpg",
  "hot-fish":  "/products/terpug.jpg",
  "cold-fish": "/products/nerka.jpg",
  "stew":      "/products/tushyonka.jpg",
};

export function Catalog() {
  const { targetRef, isIntersecting } = useIntersectionObserver();
  const [activeTab, setActiveTab] = useState("meat");

  return (
    <section id="catalog" className="py-24 px-4 bg-card border-y-4 border-border/30 relative">
      <div
        ref={targetRef as any}
        className={`max-w-6xl mx-auto fade-in-section ${isIntersecting ? "is-visible" : ""}`}
      >
        <div className="text-center mb-12">
          <h2 className="font-['Ruslan_Display'] text-5xl md:text-6xl text-primary mb-4 uppercase">
            Каталог Продукции
          </h2>
          <div className="ornament-divider">
            <span className="text-xl">❋</span>
          </div>
          <p className="font-sans text-lg text-primary max-w-2xl mx-auto italic mb-4">
            Цены указаны за кг. Уточняйте наличие по телефону!
          </p>
        </div>

        <Tabs defaultValue="meat" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap justify-center h-auto bg-transparent mb-12 gap-2">
            {CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="font-serif text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border/50 rounded-none px-6 py-3 transition-colors"
              >
                <span className="mr-2">{cat.icon}</span>
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
                    <img
                      src={CATEGORY_IMAGES[catId]}
                      alt={CATEGORIES.find((c) => c.id === catId)?.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <h3 className="absolute bottom-6 left-6 right-6 font-['Ruslan_Display'] text-3xl text-white drop-shadow-md">
                      {CATEGORIES.find((c) => c.id === catId)?.name}
                    </h3>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((p, idx) => (
                    <ProductCard key={idx} product={p} />
                  ))}
                </div>

              </div>
            </TabsContent>
          ))}
        </Tabs>

        <p className="text-center mt-10 font-sans text-sm text-muted-foreground italic">
          Это ещё не весь ассортимент — мы постоянно расширяем линейку. О новинках сообщаем отдельно!
        </p>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border-2 border-border/20 bg-background/50 hover:bg-background transition-colors group cursor-default relative overflow-hidden flex flex-col h-full">
      {product.img && (
        <div className="w-full h-40 overflow-hidden relative">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="font-serif font-bold text-xl text-primary mb-1 uppercase tracking-wide">
          {product.name}
        </h4>
        <p className="font-sans text-sm text-muted-foreground mb-3 leading-relaxed flex-grow">
          {product.desc}
        </p>
        <div className="border-t border-border/30 pt-3 mt-auto">
          {product.variants ? (
            <div className="flex gap-3 flex-wrap">
              {product.variants.map((v) => (
                <span key={v.label} className="font-sans text-sm">
                  <span className="text-muted-foreground">{v.label}:</span>{" "}
                  <span className="font-bold text-primary">{v.price}</span>
                </span>
              ))}
            </div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="font-serif font-bold text-2xl text-primary">{product.price}</span>
              <span className="font-sans text-sm text-muted-foreground">{product.unit}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

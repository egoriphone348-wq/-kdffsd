export function Footer() {
  return (
    <footer className="bg-[#1A110D] text-[#E8D9C5] py-16 px-4 border-t-8 border-accent">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="font-['Ruslan_Display'] text-4xl text-[#E8D9C5]">
            ПроКопчёный
          </h2>
          <p className="font-sans text-sm opacity-70 max-w-xs">
            Натуральное копчение по-старинному рецепту. Рождено на Звёздной. 
            Создаём продукты, которые станут главным украшением любого праздничного стола.
          </p>
        </div>

        {/* Links / Nav */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="font-serif font-bold text-lg uppercase tracking-widest text-[#E8D9C5]/50">
            Навигация
          </h3>
          <nav className="flex flex-col space-y-2 font-sans text-sm">
            <a href="#about" className="hover:text-accent transition-colors">Собственное производство</a>
            <a href="#catalog" className="hover:text-accent transition-colors">Каталог продукции</a>
            <a href="#contact" className="hover:text-accent transition-colors">Контакты и адрес</a>
          </nav>
        </div>

        {/* Mottos / Social */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <div className="font-serif italic text-xl opacity-90 text-center md:text-left">
            «Качество. Вкус. Традиции.»
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border border-[#E8D9C5]/30 rounded-full flex items-center justify-center hover:bg-[#E8D9C5] hover:text-[#1A110D] transition-colors">
              VK
            </a>
            <a href="#" className="w-10 h-10 border border-[#E8D9C5]/30 rounded-full flex items-center justify-center hover:bg-[#E8D9C5] hover:text-[#1A110D] transition-colors">
              TG
            </a>
            <a href="#" className="w-10 h-10 border border-[#E8D9C5]/30 rounded-full flex items-center justify-center hover:bg-[#E8D9C5] hover:text-[#1A110D] transition-colors">
              WA
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#E8D9C5]/10 flex flex-col gap-2 text-xs font-sans opacity-50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} #ПроКопченый. Все права защищены.</p>
          <p className="mt-1 md:mt-0">Томская область, с. Кафтанчиково</p>
        </div>
        <p className="text-center">
          ИП · ИНН 701717286837 · ОГРНИП 320703100001971
        </p>
      </div>
    </footer>
  );
}

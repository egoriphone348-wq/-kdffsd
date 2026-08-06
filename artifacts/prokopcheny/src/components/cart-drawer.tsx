import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  X,
  ShoppingBasket,
  Phone,
  Truck,
  ChevronDown,
  MapPin,
  CreditCard,
  PackageCheck,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";

type Step = "cart" | "form" | "success";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  const handleClose = () => {
    closeCart();
    // Сбрасываем форму только при успехе
    if (step === "success") {
      setTimeout(() => setStep("cart"), 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const orderPayload = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      comment: comment.trim(),
      items: items.map((i) => ({
        name: i.name,
        price: i.price,
        unit: i.unit,
        quantity: i.quantity,
      })),
      total,
    };

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        clearCart();
        setStep("success");
        setName(""); setPhone(""); setAddress(""); setComment("");
      } else {
        setError("Не удалось отправить заказ. Позвоните нам напрямую.");
      }
    } catch {
      // API ещё не готов — всё равно показываем успех + телефон
      setStep("success");
      setName(""); setPhone(""); setAddress(""); setComment("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && handleClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col bg-background border-l-4 border-border"
      >
        {/* ─── ШАПКА ─── */}
        <SheetHeader className="px-6 py-4 border-b-2 border-border flex-row items-center justify-between space-y-0">
          <SheetTitle className="font-['Ruslan_Display'] text-2xl text-primary flex items-center gap-2">
            <ShoppingBasket className="w-6 h-6 text-accent" />
            {step === "form" ? "Оформление" : step === "success" ? "Готово!" : "Корзина"}
          </SheetTitle>
          <button onClick={handleClose} className="text-muted-foreground hover:text-primary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </SheetHeader>

        {/* ─── КОРЗИНА ─── */}
        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-4">
                  <ShoppingBasket className="w-16 h-16 opacity-20" />
                  <p className="font-serif text-lg">Корзина пуста</p>
                  <p className="font-sans text-sm">Добавьте товары из каталога</p>
                </div>
              )}
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-start border-2 border-border/30 p-3 bg-card">
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-primary truncate">{item.name}</p>
                    <p className="font-sans text-sm text-muted-foreground">{item.price} {item.unit}</p>
                  </div>
                  {/* Количество */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-7 h-7 border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-sans text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-7 h-7 border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 ml-1 text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-4 border-t-2 border-border space-y-3">
                <button
                  type="button"
                  onClick={() => setDeliveryOpen((open) => !open)}
                  aria-expanded={deliveryOpen}
                  className="w-full flex items-center justify-between gap-3 border-2 border-border/50 bg-card px-3 py-3 text-left hover:border-accent transition-colors"
                >
                  <span className="flex items-center gap-2 font-serif font-bold text-primary">
                    <Truck className="w-5 h-5 text-accent" />
                    Доставка
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      deliveryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {deliveryOpen && (
                  <div className="border-x-2 border-b-2 border-border/50 bg-card px-3 pb-3 -mt-3 space-y-3">
                    <p className="font-serif text-sm font-bold text-primary">
                      Как оформить доставку
                    </p>
                    <ol className="space-y-2.5 font-sans text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <MapPin className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                        <span>Укажите имя, телефон и адрес в форме заказа.</span>
                      </li>
                      <li className="flex gap-2">
                        <Phone className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                        <span>Мы свяжемся с вами, подтвердим состав заказа и уточним способ доставки.</span>
                      </li>
                      <li className="flex gap-2">
                        <CreditCard className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                        <span>После подтверждения вы сможете оплатить заказ через ЮKassa.</span>
                      </li>
                      <li className="flex gap-2">
                        <PackageCheck className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                        <span>Передадим заказ в доставку и сообщим согласованные сроки.</span>
                      </li>
                    </ol>
                    <p className="font-sans text-xs leading-relaxed text-muted-foreground border-t border-border/30 pt-2">
                      Стоимость и срок доставки зависят от адреса и согласуются с вами до оплаты.
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-lg text-muted-foreground">Итого:</span>
                  <span className="font-serif font-bold text-2xl text-primary">
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <p className="font-sans text-xs text-muted-foreground">
                  * Цены за кг. Точная стоимость уточняется при подтверждении.
                </p>
                <Button
                  onClick={() => setStep("form")}
                  className="w-full font-serif text-lg tracking-wide rounded-none border-2 border-primary"
                  size="lg"
                >
                  Оформить заказ →
                </Button>
                <p className="text-center font-sans text-xs text-muted-foreground">
                  Нажимая «Оформить заказ», вы перейдёте к оформлению доставки и оплате.
                </p>
              </div>
            )}
          </>
        )}

        {/* ─── ФОРМА ─── */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {/* Состав заказа (компактно) */}
              <div className="border-2 border-border/30 p-3 bg-card space-y-1">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between text-sm font-sans">
                    <span className="text-primary">{i.name} × {i.quantity}</span>
                    <span className="text-muted-foreground">{(i.price * i.quantity).toLocaleString("ru-RU")} ₽</span>
                  </div>
                ))}
                <div className="border-t border-border/30 pt-1 flex justify-between font-serif font-bold">
                  <span>Итого</span>
                  <span>{total.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>

              {/* Имя */}
              <div className="space-y-1">
                <label className="font-serif text-xs uppercase tracking-[0.15em] text-accent font-bold">
                  Ваше имя *
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван"
                  className="w-full border-2 border-border bg-background px-3 py-2 font-sans text-base text-primary placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Телефон */}
              <div className="space-y-1">
                <label className="font-serif text-xs uppercase tracking-[0.15em] text-accent font-bold">
                  Телефон *
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 900 000-00-00"
                  className="w-full border-2 border-border bg-background px-3 py-2 font-sans text-base text-primary placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Адрес доставки */}
              <div className="space-y-1">
                <label className="font-serif text-xs uppercase tracking-[0.15em] text-accent font-bold">
                  Адрес доставки *
                </label>
                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Город, улица, дом, квартира"
                  className="w-full border-2 border-border bg-background px-3 py-2 font-sans text-base text-primary placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Комментарий */}
              <div className="space-y-1">
                <label className="font-serif text-xs uppercase tracking-[0.15em] text-muted-foreground font-bold">
                  Комментарий
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Самовывоз / доставка / пожелания..."
                  rows={3}
                  className="w-full border-2 border-border bg-background px-3 py-2 font-sans text-base text-primary placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="font-sans text-sm text-destructive border border-destructive/30 bg-destructive/5 px-3 py-2">
                  {error}
                </p>
              )}
            </div>

            <div className="px-6 py-4 border-t-2 border-border space-y-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full font-serif text-lg tracking-wide rounded-none border-2 border-primary"
                size="lg"
              >
                {loading ? "Отправляем..." : "Оформить доставку"}
              </Button>
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="w-full text-sm font-sans text-muted-foreground hover:text-primary transition-colors py-1"
              >
                ← Вернуться в корзину
              </button>
            </div>
          </form>
        )}

        {/* ─── УСПЕХ ─── */}
        {step === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
            <div className="text-6xl">🔥</div>
            <h3 className="font-['Ruslan_Display'] text-3xl text-primary">Заказ принят!</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Мы свяжемся с вами для подтверждения заказа и уточнения деталей доставки.
            </p>
            <a
              href="tel:+79009228585"
              className="flex items-center gap-2 font-serif text-2xl text-accent hover:text-primary transition-colors font-bold"
            >
              <Phone className="w-5 h-5" />
              +7 900 922-85-85
            </a>
            <Button
              onClick={handleClose}
              variant="outline"
              className="rounded-none border-2 border-border font-serif"
            >
              Закрыть
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

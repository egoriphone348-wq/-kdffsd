import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/context/cart";

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <motion.button
      onClick={openCart}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: itemCount > 0 ? 1 : 0, opacity: itemCount > 0 ? 1 : 0 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 shadow-2xl border-2 border-accent font-serif"
      aria-label="Корзина"
    >
      <ShoppingBasket className="w-5 h-5" />
      <span className="text-base font-bold leading-none">{itemCount}</span>
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            key="label"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="overflow-hidden whitespace-nowrap text-sm"
          >
            Корзина
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

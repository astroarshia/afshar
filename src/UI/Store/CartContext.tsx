"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Laptop } from "./LaptopCard";

type CartItem = Laptop & {
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (laptop: Laptop) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CART_STORAGE_KEY = "afshar-system-cart";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [items, isLoaded]);

  const addToCart = (laptop: Laptop) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === laptop.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === laptop.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...laptop,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const increaseQuantity = (id: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      ),
    [items]
  );

  const value = {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
